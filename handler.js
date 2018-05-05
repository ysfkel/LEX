'use strict';
const dispatch=require('./dispatch');
const userFavorites = require('./userFavorites/userFavorites');

module.exports.intents = (event, context, callback) => {
   console.log(`event bot name ${event.bot.name}`)
   try{
      // dispatch(event,(response)=>callback(null,response));
      dispatch(event).then(response=>{
           callback(null,response);
      })
   }catch(err){
     callback(err);
   }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.saveUserFavorites=(event, context, callback) => {
   console.log('saveUserFavorites lamda called');

   const item = event.Records[0].dynamodb.NewImage;
   userFavorites(item.userId.S,item.drink.S,item.size.S);
   
   console.log('ITEM',item)

}
