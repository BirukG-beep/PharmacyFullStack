import React, { useState, useMemo } from "react";
import { Table, Input, Button, Modal } from "antd";

const TransactionsTab = ({ data, onReset }) => {
  const [searchText, setSearchText] = useState("");

  // Filter logic (UI-level, lightweight)
  const filteredData = useMemo(() => {
    if (!searchText) return data;

    return data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.pharamacist.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const handleReset = () => {
    Modal.confirm({
      title: "Are you sure you want to reset transactions?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: onReset,
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Price", dataIndex: "price" },
    { title: "Pharmacist", dataIndex: "pharamacist" },
    { title: "Sold Time", dataIndex: "createdAt" },
  ];

  return (
    <>
      <Input
        placeholder="Search by name or pharmacist"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <div style={{ marginTop: 16 }}>
        <Button danger onClick={handleReset}>
          Reset Transactions
        </Button>
      </div>
    </>
  );
};

export default TransactionsTab;