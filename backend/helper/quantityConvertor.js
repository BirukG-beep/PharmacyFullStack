module.exports.quantityConvertor = (soldQuantity , medicine , soldInOption) =>{
    let newQuantity;
    if (soldInOption === 'pk' && medicine.soldIn == "pk") {
        return   soldQuantity;
      } 
      else if(soldInOption === 'pk' && medicine.soldIn == "strip"){
          return soldQuantity * medicine.stripPerPk;
      }
      else if (soldInOption === 'strip' && medicine.soldIn == "strip" ) {
        return   soldQuantity;
      } else if (soldInOption === 'pk' && medicine.soldIn === 'tablet') {
           return soldQuantity * (medicine.stripPerPk * medicine.tabletsPerStrip);
      }
       else if (soldInOption === 'strip' && medicine.soldIn === 'tablet') {
           return soldQuantity * medicine.tabletsPerStrip ;
      }
       else if (soldInOption === 'tablet' && medicine.soldIn === 'tablet') {
        return    soldQuantity;
      }
  
      if (newQuantity < 0) {
        notification.error({ message: 'Invalid Quantity', description: 'Not enough stock available.' });
        return;
      }
}