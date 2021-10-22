import { Context } from "../utils";

export const Payroll = {
    employee: ({id}, args, ctx: Context) => ctx.prisma.payroll({id}).employee(),
}