const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Context } from '../../utils'

export default {
  async loginEmp(parent, { empNum, password }, ctx: Context) {
    try {
      const employee = await ctx.prisma.employee({ empNum });
      if (!employee) {
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }
      const valid = await bcrypt.compare(password, employee.password);
      if (!valid) {
        // throw new Error(`Invalid email or password`);
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }
      return {
        token: jwt.sign({ empNum }, process.env.APP_SECRET, {
          expiresIn: "10h",
        }),
        employee,
      };
    } catch (error) {
      return error;
    }
  },
  async askSalary(parent, { token }, ctx: Context) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
    
      const empNum = decoded.empNum;
      const employee = await ctx.prisma.employee({empNum});

      if (!employee) {
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }

      if(!employee.cinemaId){
        return new ApolloError('El empleado no tiene un cine asignado.', 'ERR_NO_CINEMA_ASSIGNED')
      }
      
      const payroll = await ctx.prisma.createPayroll({employee: {connect: {empNum}}, paid: (employee.days * 200)});

      const cinema = await ctx.prisma.updateCinema({data: {payroll: {connect: {id: payroll.id}}}, where: {id: employee.cinemaId}});

      let updatedEmployee = await ctx.prisma.updateEmployee({data: {days: 0}, where: {empNum}});

      return {employee: updatedEmployee, message: 'Transacción completada exitosamente.'};

    } catch (error) {
      return error;
    }
  },
}
