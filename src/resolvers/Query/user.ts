import { Context } from "../../utils";
import * as jwt from 'jsonwebtoken';

export default {
  viewProfile: async (parent, args, ctx: Context) => {
    const { token } = args;
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    const id = decoded.userId;
    const user = await ctx.prisma.user({ id });

    return user;
  },
  viewCardStatus: async (parent, args, ctx: Context) => {
    const { token } = args;
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    const id = decoded.userId;
    const card = await ctx.prisma.user({ id }).card();

    return card;
  },
  users: (parent, args, ctx: Context) => ctx.prisma.users(),
  user: (parent, args, ctx: Context) => ctx.prisma.user(args.where),
};
