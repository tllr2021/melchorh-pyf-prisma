import { Context } from "../utils";

export const ProdNQuan = {
    product: ({id}, args, ctx: Context) => ctx.prisma.prodNQuan({id}).product()
}