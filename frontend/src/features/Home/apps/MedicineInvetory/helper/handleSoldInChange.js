


        export const handleSoldInChange = (value, quantity, medicine, TAX_RATE) => {
          console.log(value, quantity, medicine, TAX_RATE)
  let basePrice = 0;

  // Calculate price based on conversion
  if (value === 'pk') {
  if (medicine.soldIn === 'pk') {
    basePrice = medicine.price * quantity;
  } else if (medicine.soldIn === 'strip') {
    basePrice = medicine.price * medicine.stripPerPk * quantity;
  } else if (medicine.soldIn === 'tablet') {
    basePrice = medicine.price * medicine.tabletsPerStrip * medicine.stripPerPk * quantity;
  }
} else if (value === 'strip') {
    if (medicine.soldIn === 'strip') {
      basePrice = medicine.price * quantity;
    } else if (medicine.soldIn === 'tablet') {
      basePrice = medicine.price * medicine.tabletsPerStrip * quantity;
    }
  } else if (value === 'tablet') {
    if (medicine.soldIn === 'tablet') {
      basePrice = medicine.price * quantity;
    } 
  }

const finalPrice = basePrice * (1 + TAX_RATE);
console.log(basePrice, finalPrice); 

  return finalPrice;
};