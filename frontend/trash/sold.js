
    export   const handleSoldInChange = (value , quantity , medicine , TAX_RATE , setPrice) => {
          
          // Adjust price based on soldIn option
          if (value === 'pk' && medicine.soldIn === 'strip') {
            const pkPrice = medicine.stripPerPk * medicine.price * quantity;
            return (pkPrice * (1 + TAX_RATE)); // Adding tax
          } else if (value === 'strip' && medicine.soldIn === 'strip') {
            return ((medicine.price* quantity) * (1 + TAX_RATE)); // Adding tax
          } else if (value === 'strip' && medicine.soldIn === 'tablet') {
            const stripPrice = medicine.price* quantity * medicine.tabletsPerStrip;
            return (stripPrice * (1 + TAX_RATE)); // Adding tax
          } else if (value === 'tablet' && medicine.soldIn === 'tablet') {
            return (medicine.price* quantity * (1 + TAX_RATE)); // Adding tax
          } else if (value === 'pk' && medicine.soldIn === 'tablet') {
            const pkPrice = medicine.price* quantity * medicine.tabletsPerStrip * medicine.stripPerPk;
            return (pkPrice * (1 + TAX_RATE)); // Adding tax
          }
        };
