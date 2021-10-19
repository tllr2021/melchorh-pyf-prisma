import { Context } from "../../utils";

export default {
  actors: (parent, args, ctx: Context) => ctx.prisma.actors(),
  actor: (parent, args, ctx: Context) => ctx.prisma.actor(args.where),
};
