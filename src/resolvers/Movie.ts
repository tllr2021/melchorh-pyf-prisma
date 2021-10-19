import { Context } from "../utils";

export const Movie = {
    director: ({id}, args, ctx: Context) => ctx.prisma.movie({id}).director(),
    actors: ({id}, args, ctx: Context) => ctx.prisma.movie({id}).actors()
}