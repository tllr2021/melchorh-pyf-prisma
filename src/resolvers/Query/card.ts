import { Context } from "../../utils";

export default {
  cards: (parent, args, ctx: Context) => ctx.prisma.cards(args),
  card: (parent, args, ctx: Context) => ctx.prisma.card(args.where),
};