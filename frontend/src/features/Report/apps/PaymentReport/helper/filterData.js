// helper/filterData.js
export const filterDatas = (transactions = [], filters) => {
  if (!transactions.length) return [];

  return transactions.filter((item) => {
    const nameMatch = filters.name
      ? item.medicineName?.toLowerCase().includes(filters.name.toLowerCase())
      : true;

    const methodMatch = filters.Method
      ? item.Method === filters.Method
      : true;

    const dateMatch = filters.date
      ? new Date(item.date).toLocaleDateString() ===
        new Date(filters.date).toLocaleDateString()
      : true;

    return nameMatch && methodMatch && dateMatch;
  });
};