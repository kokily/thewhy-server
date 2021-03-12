import { getRepository } from 'typeorm';
import { RemoveReplyMutationArgs, RemoveReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Reply from '../../../entities/Reply';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Mutation: {
    RemoveReply: authResolver(
      async (_, args: RemoveReplyMutationArgs): Promise<RemoveReplyResponse> => {
        const { id } = args;

        try {
          const reply = await getRepository(Reply).findOne(id);

          if (!reply) {
            return {
              ok: false,
              error: '존재하지 않는 문의 글 입니다.',
            };
          }

          await getRepository(Reply).delete(id);
          await getRepository(Question).update(
            { id: reply.questionId },
            { isReply: false }
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
