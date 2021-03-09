import { getRepository } from 'typeorm';
import {
  UpdateQuestionMutationArgs,
  UpdateQuestionResponse,
} from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import { cleanNullArgs } from '../../../libs/utils';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Mutation: {
    UpdateQuestion: async (
      _,
      args: UpdateQuestionMutationArgs
    ): Promise<UpdateQuestionResponse> => {
      const { id, password } = args;
      const notNull = cleanNullArgs(args);

      try {
        const question = await getRepository(Question).findOne(id);

        if (!question) {
          return {
            ok: false,
            error: '존재하지 않는 질문입니다.',
          };
        }

        const valid = await question.validPassword(password);

        if (!valid) {
          return {
            ok: false,
            error: '비밀번호가 일치하지 않습니다.',
          };
        }

        await getRepository(Question).update(
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
    },
  },
};

export default resolvers;
