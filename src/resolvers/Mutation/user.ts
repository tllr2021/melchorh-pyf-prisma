import * as bcrypt from "bcryptjs";
import { Context } from "../../utils";

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd, token } = args.data;
    const password = await bcrypt.hash(pwd, 10);
  },
  updateUser: (parent, args, ctx: Context) => ctx.prisma.updateUser(args),
  deleteUser: (parent, args, ctx: Context) => ctx.prisma.deleteUser(args),
};
