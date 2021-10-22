const { ApolloError, } = require("apollo-server");

import { Context } from "../../utils";
import * as jwt from 'jsonwebtoken';

export default {
  generateProduct: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.createProduct(args.data);
    }
    catch (error){
        return error;
    }
  },
  editProduct: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.updateProduct(args.data);
    }
    catch (error){
        return error;
    }
  },
  removeProduct: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.deleteProduct({id: args.productId});
    }
    catch (error){
        return error;
    }
  }
};