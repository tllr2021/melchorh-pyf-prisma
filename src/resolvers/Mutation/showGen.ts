const { ApolloError, } = require("apollo-server");

import { Context } from "../../utils";
import * as jwt from 'jsonwebtoken'

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M']

export default {
  generateShow: async (parent, args, ctx: Context) => {
    try{
      const { date, movieId, roomNum, roomType, token } = args.data;
      const decoded = await jwt.verify(token, process.env.APP_SECRET);
      const admin = await ctx.prisma.user({id: decoded.userId});

      if(admin.email != 'admin@admin.com'){
        return new ApolloError('You need to be admin to perform this action', 'ERR_NOT_ADMIN')
      }

      let uDate = new Date(date);

      if(isNaN(uDate.getTime())){
        return new ApolloError('Fecha no válida.', 'ERR_INVALID_DATE');
      }

      const shows = await ctx.prisma.shows();
      console.log(shows);
      for(let i = 0; i < shows.length; i++){
          const showRoom = await ctx.prisma.show({id: shows[i].id}).room();
            //console.log(showRoom);

          if(shows[i].date.toString() == date && showRoom.roomNum == roomNum){
              return new ApolloError('La sala está ocupada a esa hora.', 'ERR_OCCUPIED_ROOM');
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
    catch(error){
      return error;
    }
  }
};

//ctx.prisma.createDirector(args.data)