
const lexResponse = require('./lexResponse')
module.exports = (intentRequest, callback)=>{

    const coffeeSize = intentRequest.currentIntent.slots.size;
    const coffeeType = intentRequest.currentIntent.slots.coffee;

    console.log('coffee type ', coffeeType+ ' size '+coffeeSize);

    const source =  intentRequest.invocationSource;

    if(source==='DialogCodeHook'){
       
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateCoffeeOrder(coffeeType,coffeeSize);
        if(!validationResult.isValid){
            slots[`${validationResult.violatedSlot}`] = null;
        }
        callback(lexResponse.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,slots,));
        return;
    }
    callback(lexResponse.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;

}