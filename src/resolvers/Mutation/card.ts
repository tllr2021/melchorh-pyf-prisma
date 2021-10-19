import { Context } from "../../utils";

export default {
  createCard: (parent, args, ctx: Context) => ctx.prisma.createCard(args.data)
};