import { getRepository } from 'typeorm';
import { ReplyConfirmQueryArgs, ReplyConfirmResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/auth/auth';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Query: {
    ReplyConfirm: authResolver(
      async (_, args: ReplyConfirmQueryArgs): Promise<ReplyConfirmResponse> => {
        const { id } = args;

        try {
          const reply = await getRepository(Reply).findOne(id);

          if (!reply) {
            return {
              ok: false,
              error: '존재하지 않는 답글입니다.',
              reply: null,
            };
          }

          return {
            ok: true,
            error: null,
            reply,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            reply: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
