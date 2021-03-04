import { getRepository } from 'typeorm';
import { AddNoticeMutationArgs, AddNoticeResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Notice from '../../../entities/Notice';

const resolvers: Resolvers = {
  Mutation: {
    AddNotice: authResolver(
      async (_, args: AddNoticeMutationArgs): Promise<AddNoticeResponse> => {
        try {
          const notice = await getRepository(Notice).create({ ...args });

          await notice.save();

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
