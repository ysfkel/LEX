const lexResponse = require('./lexResponse');

module.exports = (intentRequest)=>{
      const source = intentRequest.invocationSource;

      if(source==='FulfillmentCodeHook') {
           return Promise.resolve(lexResponse.close(intentRequest.sessionAttributes, 
            'Fulfilled',null));
      }
}