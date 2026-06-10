export const processTransactionData = (transactions) => {
  const revenueMap = new Map();        // pharmacist -> total revenue
  const medicineQuantityMap = new Map(); // medicine -> total quantity sold
  const pharmacistQuantityMap = new Map(); // pharmacist -> total quantity sold

  transactions.forEach((tx) => {
    const revenue = tx.price * tx.quantity;
    const pharmacistName = tx.pharamacist; // ← use the exact field name from your data

    // 1. Revenue per pharmacist
    revenueMap.set(pharmacistName, (revenueMap.get(pharmacistName) || 0) + revenue);

    // 2. Quantity per medicine
    medicineQuantityMap.set(tx.name, (medicineQuantityMap.get(tx.name) || 0) + tx.quantity);

    // 3. Quantity per pharmacist
    pharmacistQuantityMap.set(pharmacistName, (pharmacistQuantityMap.get(pharmacistName) || 0) + tx.quantity);
  });

  const revenueByPharmacist = Array.from(revenueMap, ([name, value]) => ({ name, value }));
  const quantityByMedicine = Array.from(medicineQuantityMap, ([name, value]) => ({ name, value }));
  const quantityByPharmacist = Array.from(pharmacistQuantityMap, ([name, value]) => ({ name, value }));

  console.log("Revenue by Pharmacist:", revenueByPharmacist);
  console.log("Quantity by Medicine:", quantityByMedicine);
  console.log("Quantity by Pharmacist:", quantityByPharmacist);
  return { revenueByPharmacist, quantityByMedicine, quantityByPharmacist };
};