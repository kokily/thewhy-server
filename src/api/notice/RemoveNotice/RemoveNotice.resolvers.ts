import { getRepository } from 'typeorm';
import { RemoveNoticeMutationArgs, RemoveNoticeResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Notice from '../../../entities/Notice';

const resolvers: Resolvers = {
  Mutation: {
    RemoveNotice: authResolver(
      async (_, args: RemoveNoticeMutationArgs): Promise<RemoveNoticeResponse> => {
        const { id } = args;

        try {
          await getRepository(Notice).delete(id);

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
      }
    ),
  },
};

export default resolvers;
