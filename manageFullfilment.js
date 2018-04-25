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

const fulfillOrder=(coffeeType, coffeeSize)=>{
  return databaseManager.saveOrderToDatabase(coffeeType, coffeeSize).then((item)=>{
         return buildFulfilmentResult(
             'Fulfilled',
             `Tnank , you orderid ${item.orderId} has been placed and `
         )
  })
}


module.exports = (intentRequest, callback)=>{
   const coffeeType = intentRequest.currentIntent.slots.coffee;
   const coffeeSize = intentRequest.currentIntent.slots.size;
   return fulfillOrder(coffeeType, coffeeSize).then(fulfilledOrder=>{
        console.log('FULFILMENT CODE HOOK');
        callback(lexResponse.close(intentRequest.sessionAttributes, fulfilledOrder.fulfillmentState,fulfilledOrder.message));
        return;
   })
   // const source = intentRequest.invocationSource;

  
    //if(source==='FulfillmentCodeHook'){
         console.log('FULFILMENT CODE HOOK');
         callback(lexResponse.close(intentRequest.sessionAttributes,
          'Fulfilled',{ contentType:'PlainText',  content:'Order was placed' }));
    //}
}




