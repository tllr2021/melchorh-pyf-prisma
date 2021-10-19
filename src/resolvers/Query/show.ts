import { Context } from "../../utils";

export default {
  shows: (parent, args, ctx: Context) => ctx.prisma.shows(),
  show: (parent, args, ctx: Context) => ctx.prisma.show(args.where),
};
