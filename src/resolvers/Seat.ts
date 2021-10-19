import { Context } from "../utils";

export const Seat = {
    room: ({id}, args, ctx: Context) => ctx.prisma.seat({id}).room(),
}