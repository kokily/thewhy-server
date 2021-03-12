import { getRepository } from 'typeorm';
import { AddReplyMutationArgs, AddReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Reply from '../../../entities/Reply';
import authResolver from '../../../libs/auth/auth';

const resolvers: Resolvers = {
  Mutation: {
    AddReply: authResolver(
      async (_, args: AddReplyMutationArgs): Promise<AddReplyResponse> => {
        try {
          const reply = await getRepository(Reply).create({ ...args });

          await reply.save();

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
