import { getManager, getRepository } from 'typeorm';
import { ListNoticeQueryArgs, ListNoticeResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Notice from '../../../entities/Notice';

const resolvers: Resolvers = {
  Query: {
    ListNotice: async (_, args: ListNoticeQueryArgs): Promise<ListNoticeResponse> => {
      const { page } = args;
      let currentPage = 1;

      try {
        if (page) {
          currentPage = page;
        }

        const notice = await getManager()
          .createQueryBuilder(Notice, 'notice')
          .limit(10)
          .skip((currentPage - 1) * 10)
          .orderBy('notice.created_at', 'DESC')
          .addOrderBy('notice.id', 'DESC')
          .getMany();

        const noticeCount = await getRepository(Notice).count();

        return {
          ok: true,
          error: null,
          notice,
          lastPage: Math.ceil(noticeCount / 10),
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          notice: null,
          lastPage: 1,
        };
      }
    },
  },
};

export default resolvers;
