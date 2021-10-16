import { Context } from "../../utils";

export default {
  orders: (parent, args, ctx: Context) => ctx.prisma.orders(),
  order: (parent, args, ctx: Context) => ctx.prisma.order(args.where),
};
