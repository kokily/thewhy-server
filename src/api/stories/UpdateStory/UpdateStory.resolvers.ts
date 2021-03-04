import { getRepository } from 'typeorm';
import { UpdateStoryMutationArgs, UpdateStoryResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import { cleanNullArgs } from '../../../libs/utils';
import Story from '../../../entities/Story';

const resolvers: Resolvers = {
  Mutation: {
    UpdateStory: authResolver(
      async (_, args: UpdateStoryMutationArgs): Promise<UpdateStoryResponse> => {
        const { id } = args;

        try {
          const notNull = cleanNullArgs(args);

          await getRepository(Story).update(
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
      }
    ),
  },
};

export default resolvers;
