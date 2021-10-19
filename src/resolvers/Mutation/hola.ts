import { Context } from "../../utils";

export default {
  hola: (parent, args, ctx: Context) => "Hola amigo " + args.data
};