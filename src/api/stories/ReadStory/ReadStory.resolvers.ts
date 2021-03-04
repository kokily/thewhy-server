import { getRepository } from 'typeorm';
import { ReadStoryQueryArgs, ReadStoryResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Story from '../../../entities/Story';

const resolvers: Resolvers = {
  Query: {
    ReadStory: async (_, args: ReadStoryQueryArgs): Promise<ReadStoryResponse> => {
      const { id } = args;

      try {
        const story = await getRepository(Story).findOne(id);

        if (!story) {
          return {
            ok: false,
            error: '해당 스토리가 없습니다.',
            story: null,
          };
        }

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
    },
  },
};

export default resolvers;
