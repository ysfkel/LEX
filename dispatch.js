
const orderCoffee = require('./orderCoffee');
const greetUser = require('./greetUser');
module.exports = function(intentRequest,callback){
    console.log(`dispatch userId ${intentRequest.userId} intent name ${intentRequest.currentIntent.name}`);
    const intentName = intentRequest.currentIntent.name;
    if(intentName==='CoffeeOrder'){
        console.log(`${intentName} was called`);
        //orderCoffee(intentRequest,callback);
        return  orderCoffee(intentRequest);
    }
    console.log('LAMBDA HIT------- ')
    if(intentName==="GreetIntent"){
        console.log('GREET CALLED ',intentRequest)
         return greetUser(intentRequest);
    }

   // throw new Error(`intent with name ${intentName} not supported`);
}