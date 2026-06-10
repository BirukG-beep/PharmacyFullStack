export const totalSaleCalculator = (date , sale) =>{
    const selectedDateStr = date.toISOString().split('T')[0];
    console.log(selectedDateStr)
           let totalSale = 0;
            sale.forEach(item => {
             const itemDateStr = new Date(item.sentDate).toISOString().split('T')[0];
             console.log(itemDateStr)
             if (itemDateStr === selectedDateStr) {
               totalSale += item.totalSale;
             }
           });
             return totalSale;
}