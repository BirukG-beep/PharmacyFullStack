  module.exports.calculatePrice = (medicine, soldInOption) => {
    const TAX_RATE = 0.02;
    let price = medicine.price;
    if (soldInOption === 'pk' && medicine.soldIn === 'strip') {
      price = medicine.stripPerPk * medicine.price;
    } else if (soldInOption === 'strip' && medicine.soldIn === 'strip') {
      price = medicine.price;
    } else if (soldInOption === 'strip' && medicine.soldIn === 'tablet') {
      price = medicine.price * medicine.tabletsPerStrip;
    } else if (soldInOption === 'tablet' && medicine.soldIn === 'tablet') {
      price = medicine.price;
    } else if (soldInOption === 'pk' && medicine.soldIn === 'tablet') {
      price = medicine.price * medicine.tabletsPerStrip * medicine.stripPerPk;
    }
    return price * (1 + TAX_RATE);
  };