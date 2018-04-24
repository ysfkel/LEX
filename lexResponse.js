
module.exports =(sessionAttributes, slots)=>{
   return {
    sessionAttributes,
    dialogAction: {
        types: 'Delegate',
        slots
     }
   }
}