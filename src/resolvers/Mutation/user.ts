import { Context } from "../../utils";

export default {
  createUser: (parent, args, ctx: Context) => ctx.prisma.createUser(args.data),
  updateUser: (parent, args, ctx: Context) => ctx.prisma.updateUser(args.data),
};