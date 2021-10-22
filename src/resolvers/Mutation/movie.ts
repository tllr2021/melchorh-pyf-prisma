const { ApolloError, } = require("apollo-server");

import { Context } from "../../utils";
import * as jwt from 'jsonwebtoken';

export default {
  generateMovie: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.createMovie(args.data);
    }
    catch (error){
        return error;
    }
  },
  editMovie: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.updateMovie(args.data);
    }
    catch (error){
        return error;
    }
  },
  removeMovie: async (parent, args, ctx: Context) => {
    try{
      const decoded = await jwt.verify(args.token, process.env.APP_SECRET);

      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
          return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }
      
      return ctx.prisma.deleteMovie({id: args.movieId});
    }
    catch (error){
        return error;
    }
  }
};