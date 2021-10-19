import { Context } from "../utils";

export const Movie = {
    card: ({id}, args, ctx: Context) => ctx.prisma.user({id}).card(),
}