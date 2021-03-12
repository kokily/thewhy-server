import { getRepository } from 'typeorm';
import {
  DeleteQuestionMutationArgs,
  DeleteQuestionResponse,
} from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Mutation: {
    DeleteQuestion: authResolver(
      async (_, args: DeleteQuestionMutationArgs): Promise<DeleteQuestionResponse> => {
        const { id } = args;

        try {
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
      }
    ),
  },
};

export default resolvers;
