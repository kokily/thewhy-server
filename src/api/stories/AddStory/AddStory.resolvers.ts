import { getRepository } from 'typeorm';
import { AddStoryMutationArgs, AddStoryResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Story from '../../../entities/Story';

const resolvers: Resolvers = {
  Mutation: {
    AddStory: authResolver(
      async (_, args: AddStoryMutationArgs): Promise<AddStoryResponse> => {
        try {
          const story = await getRepository(Story).create({ ...args });

          await story.save();

          return {
            ok: true,
            error: null,
            story,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            story: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
