import { getRepository } from 'typeorm';
import { RemoveReplyMutationArgs, RemoveReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Mutation: {
    RemoveReply: authResolver(
      async (_, args: RemoveReplyMutationArgs): Promise<RemoveReplyResponse> => {
        const { id } = args;

        try {
          await getRepository(Reply).delete(id);

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
