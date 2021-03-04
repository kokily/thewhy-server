import { getManager, getRepository } from 'typeorm';
import { ListStoriesQueryArgs, ListStoriesResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Story from '../../../entities/Story';

const resolvers: Resolvers = {
  Query: {
    ListStories: async (_, args: ListStoriesQueryArgs): Promise<ListStoriesResponse> => {
      const { title, tag, cursor } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Story, 'stories')
          .limit(6)
          .orderBy('stories.created_at', 'DESC')
          .addOrderBy('stories.id', 'DESC');

        if (title) {
          query.andWhere('stories.title like :title', { title: `%${title}%` });
        }

        if (tag) {
          query.andWhere(":tag = ANY (string_to_array(post.tags, ','))", { tag });
        }

        if (cursor) {
          const story = await getRepository(Story).findOne({ id: cursor });

          if (!story) {
            return {
              ok: false,
              error: '알 수 없는 오류 발생',
              stories: null,
            };
          }

          query.andWhere('stories.created_at < :date', {
            date: story.created_at,
          });

          query.orWhere('stories.created_at = :date AND stories.id < :id', {
            date: story.created_at,
            id: story.id,
          });
        }

        const stories = await query.getMany();

        return {
          ok: true,
          error: null,
          stories,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          stories: null,
        };
      }
    },
  },
};

export default resolvers;
