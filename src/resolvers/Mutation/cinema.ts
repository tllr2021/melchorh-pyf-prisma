import { Context } from "../../utils";

export default {
  createCinema: (parent, args, ctx: Context) => ctx.prisma.createCinema(args.data)
};