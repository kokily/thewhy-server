import { getRepository } from 'typeorm';
import {
  RemoveQuestionMutationArgs,
  RemoveQuestionResponse,
} from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';
import authResolver from '../../../libs/auth/auth';

const resolvers: Resolvers = {
  Mutation: {
    RemoveQuestion: authResolver(
      async (_, args: RemoveQuestionMutationArgs): Promise<RemoveQuestionResponse> => {
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
