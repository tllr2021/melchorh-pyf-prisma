import { Context } from "../../utils";

export default {
  createDirector: (parent, args, ctx: Context) => ctx.prisma.createDirector(args.data)
};