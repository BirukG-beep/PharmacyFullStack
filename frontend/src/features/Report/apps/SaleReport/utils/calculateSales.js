export const calculateSales = (data) => {
  if (!data || data.length === 0) {
    return { total: 0, average: 0, trend: null };
  }

  const total = data.reduce((acc, transaction) => acc + (transaction.quantity * transaction.price), 0);
  const average = data.length ? total / data.length : 0;

  let trend = null;
  if (data.length >= 2) {
    const lastTransaction = data[data.length - 1].quantity * data[data.length - 1].price;
    const secondLastTransaction = data[data.length - 2].quantity * data[data.length - 2].price;

    if (lastTransaction > secondLastTransaction) {
      trend = 'up';
    } else if (lastTransaction < secondLastTransaction) {
      trend = 'down';
    } else {
      trend = 'stable';
    }
  }

  return { total, average, trend };
};