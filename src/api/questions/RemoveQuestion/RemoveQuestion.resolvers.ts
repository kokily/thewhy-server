import { getRepository } from 'typeorm';
import {
  RemoveQuestionMutationArgs,
  RemoveQuestionResponse,
} from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Mutation: {
    RemoveQuestion: async (
      _,
      args: RemoveQuestionMutationArgs
    ): Promise<RemoveQuestionResponse> => {
      const { id, password } = args;

      try {
        const question = await getRepository(Question).findOne(id);

        if (!question) {
          return {
            ok: false,
            error: '존재하지 않는 문의 글 입니다.',
          };
        }

        const valid = await question.validPassword(password);

        if (!valid) {
          return {
            ok: false,
            error: '비밀번호가 일치하지 않습니다.',
          };
        }

        await getRepository(Question).delete(id);

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
    },
  },
};

export default resolvers;
