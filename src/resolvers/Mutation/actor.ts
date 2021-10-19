import { Context } from "../../utils";

export default {
  createActor: (parent, args, ctx: Context) => ctx.prisma.createActor(args.data)
};