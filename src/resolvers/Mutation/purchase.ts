import { Context } from "../../utils";

export default {
  createPurchase: (parent, args, ctx: Context) => ctx.prisma.createPurchase(args.data)
};