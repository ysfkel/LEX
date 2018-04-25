
const orderCoffee = require('./orderCoffee');

module.exports = function(intentRequest,callback){
    console.log(`dispatch userId ${intentRequest.userId} intent name ${intentRequest.currentIntent.name}`);
    const intentName = intentRequest.currentIntent.name;
    if(intentName==='CoffeeOrder'){
        console.log(`${intentName} was called`);
        orderCoffee(intentRequest,callback);
    }

   // throw new Error(`intent with name ${intentName} not supported`);
}