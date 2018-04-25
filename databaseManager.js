
const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const {promisify}=require('es6-promisify');
const dynamo=new AWS.DynamoDB.DocumentClient();
//
module.exports.saveOrderToDatabase=(coffeeType, coffeeSize)=>{
      
    console.log('SAVE ORDER TO DATABASE');

    const item={};
    item.orderId=uuidV1();
    item.drink=coffeeType;
    item.size=coffeeSize;

    const params = {
         TableName:'coffee-order-table',
         Item: item
    }



   return new Promise((res,rej)=>{
        dynamo.put(params, function(err, data) {
            if (err) {
           
                rej(err);
                //return
            } else {
                
                 res(item);
            }
        });
    })
   

}