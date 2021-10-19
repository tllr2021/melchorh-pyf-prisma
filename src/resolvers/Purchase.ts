import { Context } from "../utils";

export const Purchase = {
    seat: ({id}, args, ctx: Context) => ctx.prisma.purchase({id}).seat(),
    user: ({id}, args, ctx: Context) => ctx.prisma.purchase({id}).user()
}