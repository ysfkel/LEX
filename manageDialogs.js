const lexResponse = require('./lexResponse')
module.exports = (intentRequest)=>{

    const coffeeSize = intentRequest.currentIntent.slots.size;
    const coffeeType = intentRequest.currentIntent.slots.coffee;

    const slots = intentRequest.currentIntent.slots;
    console.log('coffee type ', coffeeType+ ' size '+coffeeSize);
    console.log('MY -- SLOTS',intentRequest.currentIntent.slots);
    console.log('MY -- INTENT REQUEST',intentRequest)
            const validationResult = validateCoffeeOrder(coffeeType,coffeeSize);
            if (!validationResult.isValid) {
                slots[`${validationResult.violatedSlot}`] = null;
            // return Promise.resolve(
                return Promise.resolve(lexResponse.elicitSlot(
                    intentRequest.sessionAttributes,
                    intentRequest.currentIntent.name,
                    slots,
                    validationResult.violatedSlot,
                    validationResult.message
                    // validationResult.options.title,
                    // validationResult.options.imageUrl,
                    // validationResult.options.buttons
                ));
            // );
            }
        
            //If size is not define then set it as normal
            if (coffeeSize == null) {
                intentRequest.currentIntent.slots.size = 'normal';
            }
            return Promise.resolve(lexResponse.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
           
      //  }
}   




const types = ['latte', 'americano', 'cappuccino', 'expresso'];
const sizes = ['double', 'normal', 'large'];

function validateCoffeeOrder(coffeeType, coffeeSize) {
    if (coffeeType && types.indexOf(coffeeType.toLowerCase()) === -1) {
      const options = getOptions('Select a coffee', types);
      return buildValidationResult(false, 'coffee', `We do not have ${coffeeType}, would you like a different type of coffee?  Our most popular coffee is americano.`, options);
    }
  
    if (coffeeSize && sizes.indexOf(coffeeSize.toLowerCase()) === -1) {
      const options = getOptions('Select a size', sizes);
      return buildValidationResult(false, 'size', `We do not have ${coffeeSize}, would you like a different size of coffee? Our most popular size is normal.`, options);
    }
  
    if (coffeeType && coffeeSize) {
      //Latte and cappuccino can be normal or large
      if ((coffeeType.toLowerCase() === 'cappuccino' || coffeeType.toLowerCase() === 'latte') && !(coffeeSize.toLowerCase() === 'normal' || coffeeSize.toLowerCase() === 'large')) {
        const options = getOptions('Select a size', ['normal', 'large']);
        return buildValidationResult(false, 'size', `We do not have ${coffeeType} in that size. Normal or large are the available sizes for that drink.`, options);
      }
  
      //Expresso can be normal or double
      if (coffeeType.toLowerCase() === 'expresso' && !(coffeeSize.toLowerCase() === 'normal' || coffeeSize.toLowerCase() === 'double')) {
        const options = getOptions('Select a size', ['normal', 'double']);
        return buildValidationResult(false, 'size', `We do not have ${coffeeType} in that size. Normal or double are the available sizes for that drink.`, options);
      }
  
      //Americano is always normal
      if (coffeeType.toLowerCase() === 'americano' && coffeeSize.toLowerCase() !== 'normal') {
        const options = getOptions('Select a size', ['normal']);
        return buildValidationResult(false, 'size', `We do not have ${coffeeType} in that size. Normal is the available sizes for that drink.`, options);
      }
    }
  
    return buildValidationResult(true, null, null);
  }


  
  function getOptions(title, types) {
    return {
      title,
      imageUrl: 'http://www.foodinsight.org/sites/default/files/coffee%20based%20drinks.jpg'
    //  buttons: getButtons(types)
    };
  }

  function buildValidationResult(isValid, violatedSlot, messageContent, options) {
    if (messageContent == null) {
      return {
        isValid,
        violatedSlot,
        options
      };
    }
    return {
      isValid,
      violatedSlot,
      message: { contentType: 'PlainText', content: messageContent },
      options
    };
  }
  