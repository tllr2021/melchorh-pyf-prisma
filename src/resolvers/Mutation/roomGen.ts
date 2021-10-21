import { Context } from "../../utils";

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M']

export default {
  generateRoom: async (parent, args, ctx: Context) => {
    const { roomNum, roomType } = args.data;
    let seats = [];
    for(let i = 0; i < letters.length; i++){
      for(let j = 1; j < 11; j++){
        let seat = await ctx.prisma.createSeat({seatCode: `${letters[i]}${j}`});

        seats.push({id: seat.id});
      }
    }
    let room = await ctx.prisma.createRoom({roomNum, roomType, seats: {connect: seats}})

    const ansOb = {id: room.id, room, message: "Sala creada correctamente."}
    return ansOb;
  }
};