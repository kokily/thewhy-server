import { Context } from 'koa';
import { LogoutResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import { setTokenCookie } from '../../../libs/auth/token';

const resolvers: Resolvers = {
  Mutation: {
    Logout: async (_, __, { ctx }: { ctx: Context }): Promise<LogoutResponse> => {
      setTokenCookie(ctx, '', '');

      return {
        ok: true,
        error: null,
      };
    },
  },
};

export default resolvers;
