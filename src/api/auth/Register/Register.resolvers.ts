import { RegisterMutationArgs, RegisterResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Mutation: {
    Register: async (_, args: RegisterMutationArgs): Promise<RegisterResponse> => {
      const { password } = args;

      try {
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};

export default resolvers;
