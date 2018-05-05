'use strict';

const databaseManager = require('../databaseManager');

module.exports = (userId,drink, size)=> {
      console.log('userId:',userId);

      databaseManager.saveOrderToDatabase(userId,drink,size)
      .then(item=>{
            console.log(item);
      })
}