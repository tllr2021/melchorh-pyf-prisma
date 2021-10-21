import { Context } from "../../utils";

export default {
  prodNQuans: (parent, args, ctx: Context) => ctx.prisma.prodNQuans(),
  prodNQuan: (parent, args, ctx: Context) => ctx.prisma.prodNQuan(args.where),
};
