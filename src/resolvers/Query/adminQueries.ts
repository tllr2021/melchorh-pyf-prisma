const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import { Context } from '../../utils'

export default {
    async cinemaFinancesBrief(parent, args, ctx: Context) {
        try{
            const { cinemaId } = args;
            const decoded = await jwt.verify(args.token, process.env.APP_SECRET);
    
            const admin = await ctx.prisma.user({id: decoded.userId});
    
            if(admin.email != 'admin@admin.com'){
                return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
            }
    
            const purchases = await ctx.prisma.cinema({id: cinemaId}).purchases();
            const payroll = await ctx.prisma.cinema({id: cinemaId}).payroll();
            const employees = await ctx.prisma.cinema({id: cinemaId}).employees();

            let purchaseTot = 0;
            let payrollTot = 0;
            let employeesTot = employees.length;
            
            for(let i = 0; i < purchases.length; i++){
                purchaseTot += purchases[i].total;
            }

            for(let i = 0; i < payroll.length; i++){
                payrollTot += payroll[i].paid;
            }

            return `Total ganado en ventas: ${purchaseTot}, Total gastado en nóminas: ${payrollTot}, Empleados totales: ${employeesTot}`;
        }
        catch (error){
            return error;
        }
    },
}