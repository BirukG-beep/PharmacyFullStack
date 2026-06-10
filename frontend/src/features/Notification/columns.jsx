import { Button } from "antd";

export const getColumns = (handleDelete) => [
  {
    title: 'Name',
    dataIndex: 'medicineName',
    key: 'medicineName',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Expire Date',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Button danger onClick={() => handleDelete(record._id)}>
        Delete
      </Button>
    ),
  },
];