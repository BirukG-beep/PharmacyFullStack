module.exports.QuantityCalculator = (soldQuantity , medicine , soldInOption) =>{
    let newQuantity;
    if (soldInOption === 'pk' && medicine.soldIn == "pk") {
        return  newQuantity = medicine.quantity - soldQuantity;
      } 
      else if(soldInOption === 'pk' && medicine.soldIn == "strip"){
          newQuantity = (medicine.quantity  / medicine.stripPerPk) - soldQuantity;
          return newQuantity * medicine.stripPerPk;
      }
      else if (soldInOption === 'strip' && medicine.soldIn == "strip" ) {
        return   newQuantity = medicine.quantity - soldQuantity;
      } else if (soldInOption === 'pk' && medicine.soldIn === 'tablet') {
           newQuantity = (medicine.quantity  / (medicine.stripPerPk * medicine.tabletsPerStrip)) - soldQuantity;
           return newQuantity * (medicine.stripPerPk * medicine.tabletsPerStrip);
      }
       else if (soldInOption === 'strip' && medicine.soldIn === 'tablet') {
           newQuantity = (medicine.quantity  / medicine.tabletsPerStrip ) - soldQuantity;
           return newQuantity * medicine.tabletsPerStrip ;
      }
       else if (soldInOption === 'tablet' && medicine.soldIn === 'tablet') {
        return   newQuantity = medicine.quantity   - soldQuantity;
      }
  
      if (newQuantity < 0) {
        notification.error({ message: 'Invalid Quantity', description: 'Not enough stock available.' });
        return;
      }
}