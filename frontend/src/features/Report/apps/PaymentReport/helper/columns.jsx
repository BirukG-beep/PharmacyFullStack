// helper/columns.js
export const columns = [
  {
    title: 'Name',
    dataIndex: 'medicineName',
    key: 'medicineName',
    sorter: true,
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
    render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    render: (price) => <span>{price.toFixed(2)} Birr</span>,
  },
  {
    title: 'Sold Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
  },
  {
    title: 'Total',
    key: 'total',
    render: (_, record) => <span>{(record.price * record.quantity).toFixed(2)} Birr</span>,
  },
  {
    title: 'Method',
    dataIndex: 'Method',
    key: 'Method',
    sorter: true,
  },
];