import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from 'src/inputs/create-user.input';
import { LoginUserInput } from 'src/inputs/login-user.input';
import { UserWithBusiness } from 'src/inputs/user-response-with-business';
import { UserResponse } from 'src/inputs/user-response.interface';
import { Business } from 'src/models/business.model';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Business)
    private readonly businessModel: typeof Business,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<UserWithBusiness> {
    const transaction = await User.sequelize.transaction();

    try {
      const user = await User.create(createUserInput, { transaction });
      let businessData = null;

      if (createUserInput.userType === 'biz_manager') {
        const business = await Business.create(
          {
            name: createUserInput.businessName,
            description: createUserInput.businessDescription,
            ownerId: user.id,
          },
          { transaction },
        );

        businessData = {
          id: business.id,
          name: business.name,
          description: business.description,
        };
      }

      await transaction.commit();
      return { ...user.get(), business: businessData };
    } catch (error) {
      await transaction.rollback();
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Email already exists.');
      }
      throw error;
    }
  }

  async loginUser(loginUserInput: LoginUserInput): Promise<UserResponse> {
    const { email, password } = loginUserInput;
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password.');
    }
    // Get the user details excluding the password
    const { password: _, ...userDetails } = user.get();

    // Return the user details along with a success status and status code
    return {
      status: 'success',
      statusCode: 200,
      user: userDetails, // Return the user details (including id, createdAt, etc.)
    } as UserResponse;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      throw new Error('Could not fetch users');
    }
  }

  async findAllBusinessManagers(): Promise<User[]> {
    try {
      return await this.userModel.findAll({
        where: { userType: 'biz_manager' },
        include: [Business],
      });
    } catch (error) {
      console.error('Error fetching business managers:', error);
      throw new InternalServerErrorException(
        'Failed to fetch business managers',
      );
    }
  }

  async findUserWithBusiness(userId: number): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { id: userId },
      include: [{ model: Business }],
    });
    return user;
  }
}
