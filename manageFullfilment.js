const lexResponse = require('./lexResponse')
const databaseManager=require('./databaseManager');

const buildFulfilmentResult=(fulfillmentState, messageContent)=>{
    return {
      fulfillmentState,
      message :{
          contentType: 'PlainText', content: messageContent
      }
    }
}

const fulfillOrder=(userId,coffeeType, coffeeSize)=>{
  return databaseManager.saveOrderToDatabase(userId,coffeeType, coffeeSize).then((item)=>{
         return buildFulfilmentResult(
             'Fulfilled',
             `Thank you! you order has been placed! Order: ${item.orderId} `
         )
  })
}


module.exports = (intentRequest)=>{
   const coffeeType = intentRequest.currentIntent.slots.coffee;
   const coffeeSize = intentRequest.currentIntent.slots.size;
   const userId = intentRequest.userId;
   console.log('----USERID',userId)
   return fulfillOrder(userId,coffeeType, coffeeSize).then(fulfilledOrder=>{
        console.log('FULFILMENT CODE HOOK');
        return Promise.resolve(lexResponse.close(intentRequest.sessionAttributes, fulfilledOrder.fulfillmentState,fulfilledOrder.message));
       
   })
   // const source = intentRequest.invocationSource;

  
    //if(source==='FulfillmentCodeHook'){
         console.log('FULFILMENT CODE HOOK');
         return Promise.resolve(lexResponse.close(intentRequest.sessionAttributes,
          'Fulfilled',{ contentType:'PlainText',  content:'Order was placed' }));
    //}
}




