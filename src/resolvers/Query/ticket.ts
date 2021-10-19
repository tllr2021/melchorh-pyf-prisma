import { Context } from "../../utils";

export default {
  tickets: (parent, args, ctx: Context) => ctx.prisma.tickets(),
  ticket: (parent, args, ctx: Context) => ctx.prisma.ticket(args.where),
};
