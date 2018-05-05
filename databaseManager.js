
const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const {promisify}=require('es6-promisify');
const dynamo=new AWS.DynamoDB.DocumentClient();
//
module.exports.saveOrderToDatabase=(userId,coffeeType, coffeeSize)=>{
      
    console.log('SAVE ORDER TO DATABASE');

    const item={};
    item.orderId=uuidV1();
    item.drink=coffeeType;
    item.size=coffeeSize;
    item.userId=userId;

    return saveItem('coffee-order-table', item);
 
}

module.exports.saveUserToDatabase=(userId, coffeeType, coffeeSize)=>{
      const item={};
      item.userId=userId;
      item.coffeeType=coffeeType;
      item.coffeeSize=coffeeSize;

      return saveItem('coffee-user-table', item);
}



function saveItem(tableName, item){

    const params = {
        TableName: tableName,
        Item: item
   }  
    return new Promise((res,rej)=>{
        dynamo.put(params, function(err, data) {
            if (err) {
                console.log('--ERROR SAVING ITEM',err)
                rej(err);
                //return
            } else {
                console.log('--ITEM SAVED',err)
                 res(item);
            }
        });
    })
}