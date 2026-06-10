export const storageCalculator = (medicine) =>{
      let localNum = 0;
       let localShort = 0;
      medicine.forEach(item => {
        if (item.quantity < 8) {
          localShort += 1; // Count items with quantity less than 8
        }
        localNum += item.quantity; // Sum up all quantities
      });
      return localShort;
}