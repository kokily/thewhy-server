import { getRepository } from 'typeorm';
import { RegisterMutationArgs, RegisterResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Admin from '../../../entities/Admin';

const resolvers: Resolvers = {
  Mutation: {
    Register: async (_, args: RegisterMutationArgs): Promise<RegisterResponse> => {
      const { password } = args;

      try {
        const exists = await getRepository(Admin).findOne({ username: 'admin' });

        if (exists) {
          return {
            ok: false,
            error: '이미 관리자가 존재합니다.',
          };
        }

        const admin = await getRepository(Admin).create({ username: 'admin' });

        await admin.setPassword(password);
        await admin.save();

        return {
          ok: true,
          error: null,
        };
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
