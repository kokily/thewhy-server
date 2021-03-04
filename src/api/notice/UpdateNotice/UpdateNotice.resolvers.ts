import { getRepository } from 'typeorm';
import { UpdateNoticeMutationArgs, UpdateNoticeResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import { cleanNullArgs } from '../../../libs/utils';
import Notice from '../../../entities/Notice';

const resolvers: Resolvers = {
  Mutation: {
    UpdateNotice: authResolver(
      async (_, args: UpdateNoticeMutationArgs): Promise<UpdateNoticeResponse> => {
        const { id } = args;

        try {
          const notNull = cleanNullArgs(args);

          await getRepository(Notice).update(
            { id },
            { ...notNull, created_at: new Date() }
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
