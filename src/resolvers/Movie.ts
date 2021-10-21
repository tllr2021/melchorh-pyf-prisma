import { Context } from "../utils";

export const Movie = {
    director: (parent, args, ctx: Context) => ctx.prisma.movie({id: parent.id}).director(),
    actors: (parent, args, ctx: Context) => ctx.prisma.movie({id: parent.id}).actors()
}