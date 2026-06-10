export const filterItems = (data, value) => {
  return data.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.type.toLowerCase().includes(value.toLowerCase())
  );
};

export const filterTransactions = (data, value) => {
  return data.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.pharamacist.toLowerCase().includes(value.toLowerCase())
  );
};