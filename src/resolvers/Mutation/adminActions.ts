const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Context } from '../../utils'
import card from './card';

export default {
  async signupEmp(parent, args, ctx: Context) {
    try{
        const { name, email, status, area, empNum } = args;
        const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

        const admin = await ctx.prisma.user({id: decoded.userId});

        if(admin.email == 'admin@admin.com'){
            return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
        }
        const emp = await ctx.prisma.employee({empNum});

        if(emp){
            return new ApolloError('This employee already exists', 'ERR_EXISTING')
        }
        const password = await bcrypt.hash(args.password, 10);
        const employee = await ctx.prisma.createEmployee({name, email, status, area, password, empNum, days: 0});
        return {
            token: jwt.sign({ idEmp: employee.id }, process.env.APP_SECRET, {expiresIn: "10h"}),
            employee,
        }
    }
    catch (error){
        return error;
    }
  },
  async changeEmpStatus(parent, args, ctx: Context) {
    try{
        const { empNum } = args;
        const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

        const admin = await ctx.prisma.user({id: decoded.userId});

        if(admin.email != 'admin@admin.com'){
            return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')   
        }
        const emp = await ctx.prisma.employee({empNum});
        if(!emp){
            return new ApolloError('The employee does not exist', 'ERR_NOT_EXISTING')
        }

        const employee = await ctx.prisma.updateEmployee({data: {status: args.status}, where: {empNum}});
        return employee
    }
    catch (error){
        return error;
    }
  },
  async changeEmpInfo(parent, args, ctx: Context) {
    try{
        const { empNum, area, } = args;
        const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

        const admin = await ctx.prisma.user({id: decoded.userId});

        if(admin.email != 'admin@admin.com'){
            return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
        }
        const emp = await ctx.prisma.employee({empNum});
        if(!emp){
            return new ApolloError('The employee does not exist', 'ERR_NOT_EXISTING')
        }
        let updatedEmp;
        if(args.password){
            try {
                const password = await bcrypt.hash(args.password, 10)

                updatedEmp = await ctx.prisma.updateEmployee({data: {password}, where: {empNum}});
            } catch (error) {
                return error;
            }
        }
        if(area){
            updatedEmp = await ctx.prisma.updateEmployee({data: {area}, where: {empNum}});
        }

        return updatedEmp;
    }
    catch (error){
        return error;
    }
  },
  async assignEmpToCinema(parent, args, ctx: Context) {
    try{
        const { empNum, cinemaId } = args;
        const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

        const admin = await ctx.prisma.user({id: decoded.userId});

        if(admin.email != 'admin@admin.com'){
            return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
        }

        const emp = await ctx.prisma.employee({empNum});
        if(!emp){
            return new ApolloError('The employee does not exist', 'ERR_NOT_EXISTING')
        }
            
        let updatedCinema = await ctx.prisma.updateCinema({data: {employees: {connect: {empNum}}}, where: {id: cinemaId}});
        let updatedEmployee = await ctx.prisma.updateEmployee({data: {cinemaId}, where: {empNum}});

        return updatedCinema;
    }
    catch (error){
        return error;
    }
  },
  async cancelCard(parent, args, ctx: Context) {
    try{
        const { cardID } = args;
        const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

        const admin = await ctx.prisma.user({id: decoded.userId});

        if(admin.email != 'admin@admin.com'){
            return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
        }

        //console.log(cardID, typeof(cardID));
        const card = ctx.prisma.deleteCard({id: cardID});

        return card;
    }
    catch (error){
        return error;
    }
  },
}
