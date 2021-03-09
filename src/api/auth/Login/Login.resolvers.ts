import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { LoginMutationArgs, LoginResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Admin from '../../../entities/Admin';
import {
  createAccessToken,
  createRefreshToken,
  setTokenCookie,
} from '../../../libs/auth/token';

const resolvers: Resolvers = {
  Mutation: {
    Login: async (
      _,
      args: LoginMutationArgs,
      { ctx }: { ctx: Context }
    ): Promise<LoginResponse> => {
      const { password } = args;

      try {
        const admin = await getRepository(Admin).findOne({ username: 'admin' });

        if (!admin) {
          return {
            ok: false,
            error: '관리자 등록 후 이용하세요',
          };
        }

        const valid = await admin.validPassword(password);

        if (!valid) {
          return {
            ok: false,
            error: '비밀번호가 틀렸습니다',
          };
        }

        const accessToken = createAccessToken(admin);
        const refreshToken = createRefreshToken(admin);

        console.log('accessToken', accessToken);

        setTokenCookie(ctx, accessToken, refreshToken);

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
