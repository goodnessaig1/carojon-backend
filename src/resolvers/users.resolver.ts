import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/inputs/create-user.input';
import { LoginUserInput } from 'src/inputs/login-user.input';
import { UserWithBusiness } from 'src/inputs/user-response-with-business';
import { UserResponse } from 'src/inputs/user-response.interface';
import { User } from 'src/models/user.model';
import { UserService } from 'src/service/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserWithBusiness)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserWithBusiness> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<UserResponse> {
    return this.userService.loginUser(loginUserInput);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => [User], { name: 'getBusinessManagers' })
  async getBusinessManagers(): Promise<User[]> {
    return this.userService.findAllBusinessManagers();
  }

  @Query(() => User, { name: 'userWithBusiness', nullable: true })
  async findUserWithBusiness(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<User> {
    return this.userService.findUserWithBusiness(userId);
  }
}
