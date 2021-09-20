import { Context } from "../../utils";
import { User } from '../../generated/prisma-client/index';

export default {
  orders: (parent, args, ctx: Context) => ctx.prisma.orders(),
  order: (parent, args, ctx: Context) => ctx.prisma.order(args.where),
};
