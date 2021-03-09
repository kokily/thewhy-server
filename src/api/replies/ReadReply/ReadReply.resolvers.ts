import { getRepository } from 'typeorm';
import { ReadReplyQueryArgs, ReadReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Query: {
    ReadReply: async (_, args: ReadReplyQueryArgs): Promise<ReadReplyResponse> => {
      const { id, password } = args;

      try {
        const reply = await getRepository(Reply).findOne(id);

        if (!reply) {
          return {
            ok: false,
            error: '존재하지 않는 답글입니다.',
            reply: null,
          };
        }

        const question = await getRepository(Question).findOne({ id: reply.questionId });

        if (!question) {
          return {
            ok: false,
            error: '관계정렬 오류입니다.',
            reply: null,
          };
        }

        const valid = await question.validPassword(password);

        if (!valid) {
          return {
            ok: false,
            error: '비밀번호가 일치하지 않습니다.',
            reply: null,
          };
        }

        return {
          ok: true,
          error: null,
          reply,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          reply: null,
        };
      }
    },
  },
};

export default resolvers;
