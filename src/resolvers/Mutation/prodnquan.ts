import { Context } from "../../utils";

export default {
  createProdNQuan: (parent, args, ctx: Context) => ctx.prisma.createProdNQuan(args.data)
};