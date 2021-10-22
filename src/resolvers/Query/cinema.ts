const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import { Context } from "../../utils";

export default {
  cinemas: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.cinemas()
    }
    catch (error){
        return error;
    }
  },
  cinema: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.cinema(args.where)
    }
    catch (error){
        return error;
    }
  },
};
