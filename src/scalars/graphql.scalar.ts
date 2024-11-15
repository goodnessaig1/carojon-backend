// scalars/graphql.scalar.ts
import { GraphQLScalarType, Kind } from 'graphql';
import { GraphQLUpload } from 'graphql-upload-ts';

export const UploadScalar = new GraphQLScalarType({
  name: 'Upload',
  description: 'Upload file',
  parseValue(value: any) {
    return value; // Return the value as is for file upload
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
  serialize(value) {
    return value; // Serialize value back to the client
  },
});
