const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Context } from '../../utils'
import {v4 as uuidv4} from 'uuid';

export default {
  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10)
    const card = await ctx.prisma.createCard({cardID: uuidv4(), points: 0.00})
    const user = await ctx.prisma.createUser({ ...args, password, card: {connect: {id: card.id}}})
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {expiresIn: "10h"}),
      user,
    }
  },

  async login(parent, { email, password }, ctx: Context) {
    try {
      const user = await ctx.prisma.user({ email });
      if (!user) {
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        // throw new Error(`Invalid email or password`);
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }
      return {
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
          expiresIn: "10h",
        }),
        user,
      };
    } catch (error) {
      return error;
    }
  },
  async updatePassword(parent, args, ctx: Context) {
    const { token, password } = args.data;
    try {
      const decoded = await jwt.verify(token, process.env.APP_SECRET);
      const user = await ctx.prisma.user({ id: decoded.userId });

      if(!user){
        return new ApolloError('Su usuario no existe.', 'ERR_AUTH')
      }

      const pwd = await bcrypt.hash(password, 10)

      const updatedUser = await ctx.prisma.updateUser({data: {password: pwd}, where: {id: decoded.userId}});

      return updatedUser;
    } catch (error) {
      return error;
    }
  },
  async updateMyCard(parent, args, ctx: Context) {
    const { token, cardId } = args.data;
    try {
      const decoded = await jwt.verify(token, process.env.APP_SECRET);
      const user = await ctx.prisma.user({ id: decoded.userId });

      if(!user){
        return new ApolloError('Su usuario no existe.', 'ERR_AUTH')
      }

      const updatedUser = await ctx.prisma.updateUser({data: {card: {connect: {id: cardId}}}, where: {id: decoded.userId}});

      return updatedUser;
    } catch (error) {
      return error;
    }
  }
}
