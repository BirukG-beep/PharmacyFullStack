export const calculateAnalysis = (transactions) => {
  const map = {};

  transactions.forEach(({ pharamacist, quantity, price }) => {
    if (!map[pharamacist]) {
      map[pharamacist] = { totalQuantity: 0, totalPrice: 0 };
    }

    map[pharamacist].totalQuantity += quantity;
    map[pharamacist].totalPrice += price * quantity;
  });

  return Object.entries(map).map(([pharamacist, data]) => ({
    pharamacist,
    ...data,
  }));
};