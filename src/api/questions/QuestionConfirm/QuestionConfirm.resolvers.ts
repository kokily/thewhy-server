import { getRepository } from 'typeorm';
import {
  QuestionConfirmQueryArgs,
  QuestionConfirmResponse,
} from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';
import authResolver from '../../../libs/auth/auth';

const resolvers: Resolvers = {
  Query: {
    QuestionConfirm: authResolver(
      async (_, args: QuestionConfirmQueryArgs): Promise<QuestionConfirmResponse> => {
        const { id } = args;

        try {
          const question = await getRepository(Question).findOne(id);

          if (!question) {
            return {
              ok: false,
              error: '존재하지 않는 질문입니다.',
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
      }
    ),
  },
};

export default resolvers;
