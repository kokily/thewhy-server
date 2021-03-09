import { getRepository } from 'typeorm';
import { RemoveReplyMutationArgs, RemoveReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Question from '../../../entities/Question';
import Reply from '../../../entities/Reply';

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
              error: '존재하지 않는 답글입니다.',
            };
          }

          const question = await getRepository(Question).findOne({
            id: reply.questionId,
          });

          if (!question) {
            return {
              ok: false,
              error: '관계설정 오류입니다.',
            };
          }

          await getRepository(Reply).delete(id);
          await getRepository(Question).update(
            { id: reply.questionId },
            { isReply: false, updated_at: new Date() }
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
