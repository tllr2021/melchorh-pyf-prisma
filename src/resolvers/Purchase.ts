import { Context } from "../utils";

export const Purchase = {
    tickets: ({id}, args, ctx: Context) => ctx.prisma.purchase({id}).tickets(),
    products: ({id}, args, ctx: Context) => ctx.prisma.purchase({id}).products(),
    total: ({id}, args, ctx: Context) => ctx.prisma.purchase({id}).total()
}