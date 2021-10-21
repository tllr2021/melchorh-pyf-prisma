import { Context } from "../utils";

export const Ticket = {
    show: ({id}, args, ctx: Context) => ctx.prisma.ticket({id}).show(),
    seat: ({id}, args, ctx: Context) => ctx.prisma.ticket({id}).seat()
}