import { Context } from "../utils";

export const Show = {
    movie: ({id}, args, ctx: Context) => ctx.prisma.show({id}).movie(),
    room: ({id}, args, ctx: Context) => ctx.prisma.show({id}).room()
}