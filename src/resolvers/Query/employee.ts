const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import { Context } from "../../utils";

export default {
  viewProfileEmp: async (parent, { token }, ctx: Context) => {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
    
      const empNum = decoded.empNum;
      const employee = await ctx.prisma.employee({ empNum });

      if (!employee) {
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }

      return employee;
    } catch (error) {
      return error;
    }
  },
};
