import { Context } from "../../utils";

export default {
  purchases: (parent, args, ctx: Context) => ctx.prisma.purchases(),
  purchase: (parent, args, ctx: Context) => ctx.prisma.purchase(args.where),
};
