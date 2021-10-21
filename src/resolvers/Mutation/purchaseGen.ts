import { Context } from "../../utils";
import * as jwt from 'jsonwebtoken'

export default {
  generatePurchase: async (parent, args, ctx: Context) => {
    const { seats, showId, products, token, usePoints } = args.data;

    if(seats && showId){
      let prices = new Map([['DOSD', 60.00], ['TRESD', 70.00], ['IMAX', 80.00], ['CUATRODX', 90.00]])
      const roomS = await ctx.prisma.show({id: showId}).room().seats();
    
      let seatEval = [];
      for(let i = 0; i < seats.length; i++){
        const seat = roomS.find(seat => (seat.seatCode == seats[i] && seat.available == true));

        if(seat){
          seatEval.push(seat);
        } 
      }

      if(seatEval.length != seats.length){
        const ansOb = {id: null, purchase: null, message: "Asientos no disponibles."}
        return ansOb;
      }

      let seatReEval = [];
      for(let i = 0; i < seatEval.length; i++){
        const seat = await ctx.prisma.updateSeat({data: {available: false}, where: {id: seatEval[i].id}});
        seatReEval.push(seat);
      }

      const show = await ctx.prisma.show({id: showId});
      const price = prices.get(show.showType)

      let tickets = [];

      for(let i = 0; i < seatReEval.length; i++){
        const ticket = await ctx.prisma.createTicket({show: {connect: {id: showId}}, seat: {connect: {id: seatReEval[i].id}}, price})
        tickets.push({id: ticket.id});
      }

      let purchase = await ctx.prisma.createPurchase({tickets: {connect: tickets}, total: (tickets.length * price)})

      if(token){
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        let user = await ctx.prisma.updateUser({data: {history: {connect: {id: purchase.id}}}, where: {id: decoded.userId}});
        let card = await ctx.prisma.user({id: user.id}).card();

        if(usePoints == true){
          if(card.points > (tickets.length * price)){
            let updatedCard = await ctx.prisma.updateCard({data: {points: (card.points - (tickets.length * price))}, where: {id: card.id}});
          }
          else{
            let updatedCard = await ctx.prisma.updateCard({data: {points: 0}, where: {id: card.id}});
          }
        }
        else{
          let updatedCard = await ctx.prisma.updateCard({data: {points: (card.points + ((tickets.length * price)* .02))}, where: {id: card.id}});
        }
      }
      const ansOb = {id: purchase.id, purchase, message: "Transacción completada exitosamente."}
      return ansOb;
    }
    else{
      let articles = [];
      let prices = [];

      for(let i = 0; i < products.length; i++){
        let product = await ctx.prisma.product({name: products[i].name});

        articles.push(product.id);
        prices.push(product.price);
      }

      if(products.length != articles.length){
        const ansOb = {id: null, purchase: null, message: "Productos no disponibles."}
        return ansOb;
      }

      let total = 0;
      let prodNQuan = [];
      for(let i = 0; i < products.length; i++){
        const newProdNQuan = await ctx.prisma.createProdNQuan({product: {connect: {id: articles[i]}}, quantity: products[i].quantity});
        prodNQuan.push({id: newProdNQuan.id});
        total += (products[i].quantity * prices[i]);
      }

      
      let purchase = await ctx.prisma.createPurchase({products: {connect: prodNQuan}, total})

      if(token){
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        let user = await ctx.prisma.updateUser({data: {history: {connect: {id: purchase.id}}}, where: {id: decoded.userId}});
        let card = await ctx.prisma.user({id: user.id}).card();

        if(usePoints == true){
          if(card.points > total){
            let updatedCard = await ctx.prisma.updateCard({data: {points: (card.points - total)}, where: {id: card.id}});
          }
          else{
            let updatedCard = await ctx.prisma.updateCard({data: {points: 0}, where: {id: card.id}});
          }
        }
        else{
          let updatedCard = await ctx.prisma.updateCard({data: {points: (card.points + (total * .02))}, where: {id: card.id}});
        }
      }
      const ansOb = {id: purchase.id, purchase, message: "Transacción completada exitosamente."}
      return ansOb;
    }
    
    
  }
};