import { Context } from "../../utils";

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M']

export default {
  generateShow: async (parent, args, ctx: Context) => {
    const { date, movieId, roomNum, roomType } = args.data;

    let uDate = new Date(date);

    const shows = await ctx.prisma.shows();
    //console.log(shows);
    for(let i = 0; i < shows.length; i++){
        const showRoom = await ctx.prisma.show({id: shows[i].id}).room();
        //console.log(showRoom);

        if(shows[i].date.toString() == date && showRoom.roomNum == roomNum){
            const ansOb = {id: null, show: null, message: "La sala está ocupada a esa hora."}
            return ansOb;
        }
    }

    let seats = [];
    for(let i = 0; i < letters.length; i++){
      for(let j = 1; j < 11; j++){
        let seat = await ctx.prisma.createSeat({seatCode: `${letters[i]}${j}`});

        seats.push({id: seat.id});
      }
    }
    let room = await ctx.prisma.createRoom({roomNum, roomType, seats: {connect: seats}})
    const show = await ctx.prisma.createShow({date: uDate, movie: {connect: {id: movieId}}, room: {connect: {id: room.id}}, showType: roomType});

    const ansOb = {id: show.id, show, message: "Show creado correctamente."}

    return ansOb;
  }
};

//ctx.prisma.createDirector(args.data)