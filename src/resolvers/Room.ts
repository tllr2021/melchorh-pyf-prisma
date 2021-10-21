import { Context } from "../utils";

export const Room = {
    seats: (parent, args, ctx: Context) => ctx.prisma.room({id: parent.id}).seats()
}