import { Context } from "../utils";

export const Room = {
    seats: ({id}, args, ctx: Context) => ctx.prisma.room({id}).seats()
}