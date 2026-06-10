export const getColumns = (selectedTab) => {
  if (selectedTab === "Pharmacist") {
    return [    { title: "Pharmacist", dataIndex: "pharamacist" },
        { title: "Total Sold Quantity", dataIndex: "totalQuantity" },
        { title: "Total Sold Price", dataIndex: "totalPrice" },]
  } else if (selectedTab === "Cosmotics") {
    return [    { title: "Cosmotics", dataIndex: "name" },
        { title: "Total Sold Quantity", dataIndex: "totalQuantity" },
        { title: "Total Sold Price", dataIndex: "totalPrice" },]
  } else {
    return [    { title: "Pharmacist", dataIndex: "pharamacist" },
        { title: "Total Sold Quantity", dataIndex: "totalQuantity" },]
  }     
}