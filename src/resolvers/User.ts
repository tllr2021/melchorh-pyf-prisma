import { Context } from '../utils'

export const User = {
  orders: ({ id }, args, ctx: Context) =>
    ctx.prisma.user({ id }).orders(),
};
