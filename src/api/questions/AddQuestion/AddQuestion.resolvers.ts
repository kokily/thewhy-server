import { getRepository } from 'typeorm';
import { AddQuestionMutationArgs, AddQuestionResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Question from '../../../entities/Question';

const resolvers: Resolvers = {
  Mutation: {
    AddQuestion: async (
      _,
      args: AddQuestionMutationArgs
    ): Promise<AddQuestionResponse> => {
      const { password } = args;

      try {
        const question = await getRepository(Question).create({
          ...args,
          isReply: false,
        });

        await question.setPassword(password);
        await question.save();

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
