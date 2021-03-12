import { getManager } from 'typeorm';
import { ReadQuestionQueryArgs, ReadQuestionResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Query: {
    ReadQuestion: async (
      _,
      args: ReadQuestionQueryArgs
    ): Promise<ReadQuestionResponse> => {
      const { id } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Question, 'question')
          .leftJoinAndSelect('question.reply', 'reply')
          .where('question.id = :id', { id });

        const question = await query.getOne();

        if (!question) {
          return {
            ok: false,
            error: '존재하지 않는 문의 글입니다.',
            question: null,
          };
        }

        return {
          ok: true,
          error: null,
          question,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          question: null,
        };
      }
    },
  },
};

export default resolvers;
