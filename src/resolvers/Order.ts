import { Context } from '../utils'

export const Order = {
  user: ({ id }, args, ctx: Context) => ctx.prisma.order({ id }).user(),
};
