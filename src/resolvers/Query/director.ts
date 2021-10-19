import { Context } from "../../utils";

export default {
  directors: (parent, args, ctx: Context) => ctx.prisma.directors(),
  director: (parent, args, ctx: Context) => ctx.prisma.director(args.where),
};
