import { Context } from "../../utils";

export default {
  createSeat: (parent, args, ctx: Context) => ctx.prisma.createSeat(args.data),
  updateSeat: (parent, args, ctx: Context) => ctx.prisma.updateSeat(args.data)
};