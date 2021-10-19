import { Context } from "../utils";

export const Ticket = {
    movie: ({id}, args, ctx: Context) => ctx.prisma.ticket({id}).movie(),
    show: ({id}, args, ctx: Context) => ctx.prisma.ticket({id}).show(),
    room: ({id}, args, ctx: Context) => ctx.prisma.ticket({id}).room(),
    seat: ({id}, args, ctx: Context) => ctx.prisma.ticket({id}).seat()
}