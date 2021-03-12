import { getRepository } from 'typeorm';
import { UpdateReplyMutationArgs, UpdateReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import { cleanNullArgs } from '../../../libs/utils';
import authResolver from '../../../libs/auth/auth';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Mutation: {
    UpdateReply: authResolver(
      async (_, args: UpdateReplyMutationArgs): Promise<UpdateReplyResponse> => {
        const { id } = args;
        const notNull = cleanNullArgs(args);

        try {
          await getRepository(Reply).update(
            { id },
            { ...notNull, updated_at: new Date() }
          );

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
