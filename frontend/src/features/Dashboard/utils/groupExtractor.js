export const groupExtractor = (medicine) => {
  let n = 0;
  const newGroups = [];

  medicine.forEach(item => {
    if (!newGroups.includes(item.medicineGroup)) {
      newGroups.push(item.medicineGroup);
      n += 1;
    }
  });

  return { newGroups, count: n };
};