import { Context } from "../utils";

export const ProdNQuan = {
    product: (parent, args, ctx: Context) => ctx.prisma.prodNQuan({id: parent.id}).product()
}