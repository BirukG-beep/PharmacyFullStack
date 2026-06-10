  export    const calculateDisplayedQuantity = (soldInOption , medicine) => {
    console.log(soldInOption , medicine)
            if (!medicine) return 0;
            if (soldInOption === 'pk' && medicine.soldIn === 'pk') {
              return medicine.quantity;
            } else if(soldInOption === 'pk' && medicine.soldIn === 'strip') {
              return medicine.quantity / medicine.stripPerPk;
            }
            else if(soldInOption === 'pk' && medicine.soldIn === 'tablet') {
              let intermidiatevalue = medicine.quantity / medicine.stripPerPk;
              return intermidiatevalue / medicine.tabletsPerStrip;
            }
             else if (soldInOption === 'strip' && medicine.soldIn === 'strip') {
              return medicine.quantity * medicine.stripPerPk;
            } else if (soldInOption === 'tablet' && medicine.soldIn === 'tablet') {
              return medicine.quantity * (medicine.stripPerPk * medicine.tabletsPerStrip);
            } else if (soldInOption === 'strip' && medicine.soldIn === 'tablet') {
              return medicine.quantity * medicine.stripPerPk;
            }
            return 0;
          };