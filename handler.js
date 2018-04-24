'use strict';
const dispatch=require('./dispatch');

module.exports.intents = (event, context, callback) => {
   console.log(`event bot name ${event.bot.name}`)
   try{
    dispatch(event,(response)=>callback(null,resonse));
   }catch(err){
     callback(err);
   }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
