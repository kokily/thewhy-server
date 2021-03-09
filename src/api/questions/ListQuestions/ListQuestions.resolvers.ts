import { getManager, getRepository } from 'typeorm';
import { ListQuestionsQueryArgs, ListQuestionsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Query: {
    ListQuestions: async (
      _,
      args: ListQuestionsQueryArgs
    ): Promise<ListQuestionsResponse> => {
      const { page } = args;
      let ccurrentPage = 1;

      try {
        if (page) {
          ccurrentPage = page;
        }

        const questions = await getManager()
          .createQueryBuilder(Question, 'questions')
          .limit(10)
          .skip((ccurrentPage - 1) * 10)
          .orderBy('questions.created_at', 'DESC')
          .addOrderBy('questions.id', 'DESC')
          .getMany();

        const questionsCount = await getRepository(Question).count();

        return {
          ok: true,
          error: null,
          questions,
          lastPage: Math.ceil(questionsCount / 10),
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          questions: null,
          lastPage: 1,
        };
      }
    },
  },
};

export default resolvers;
