import * as bcrypt from "bcryptjs";
import { Context } from "../../utils";
import { sendEmail } from "../../utils/email";
import user from "../Query/user";

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd, token } = args.data;
    const password = await bcrypt.hash(pwd, 10);
    //return await ctx.prisma.updateUser({ data: { password }});
  },
  updateUser: (parent, args, ctx: Context) => ctx.prisma.updateUser(args),
  createUser: (parent, args, ctx: Context) => ctx.prisma.createUser(args.data),
};
