
const handleDialogCodeHook = require('./manageDialogs');
const handleFulfillmentCodeHook = require('./manageFullfilment');

module.exports = (intentRequest, callback)=>{
     // const coffeeType = intentRequest.currentIntent.slots.coffee;
      //const coffeeSize = intentRequest.currentIntent.slots.size;

      const source = intentRequest.invocationSource;

      if(source ==='DialogCodeHook'){
        return handleDialogCodeHook(intentRequest,callback);
      }
      if(source==='FulfillmentCodeHook'){
         return handleFulfillmentCodeHook(intentRequest,callback);
      }
}

