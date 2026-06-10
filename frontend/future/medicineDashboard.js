 // Update status based on medicine data
  const updateStatus = (data) => {
    const warningQuantityThreshold = 15;
    const warningExpiryDays = 5;
    const now = new Date();

    const lowQuantityMedicines = data.filter(med => med.quantity < warningQuantityThreshold);
    const warningQuantityMedicines = lowQuantityMedicines.length >= 5;

    const nearExpiryMedicines = data.filter(med => {
      const expiryDate = new Date(med.expirationDate);
      console.log(expiryDate)
      const daysToExpire = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      console.log(daysToExpire)
      return daysToExpire <= warningExpiryDays;
    });
    const warningExpiryMedicines = nearExpiryMedicines.length >= 20;

    let statusMessage = 'Pharmacy Status: Good';
    if (warningQuantityMedicines) {
      statusMessage = 'Warning: Quantity of some medicines is low.';
    }
    if (warningExpiryMedicines) {
      statusMessage = 'Warning: Many medicines are near expiry.';
    }
    if (warningQuantityMedicines && warningExpiryMedicines) {
      statusMessage = 'Warning: Medicines are both low in quantity and near expiry.';
    }

    setStatusMessage(statusMessage);
  };