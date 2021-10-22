import { Context } from "../utils";

export const Cinema = {
    payroll:({id}, args, ctx: Context) => ctx.prisma.cinema({id}).payroll(),
    purchases: ({id}, args, ctx: Context) => ctx.prisma.cinema({id}).purchases(),
    employees: ({id}, args, ctx: Context) => ctx.prisma.cinema({id}).employees(),
}