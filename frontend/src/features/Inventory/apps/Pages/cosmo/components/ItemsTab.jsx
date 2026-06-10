import React from "react";
import { Input, Table } from "antd";
import {useState} from "react";
const ItemsTab = ({ data }) => {
  const [searchText, setSearchText] = useState("");

  const onSearch = (e) => {
    setSearchText(e.target.value);
  }
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.type.toLowerCase().includes(searchText.toLowerCase())
  );
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Expire Date", dataIndex: "expireDate", key: "expireDate" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <>
      <Input
        onChange={onSearch}
        placeholder="Search..."
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredData} columns={columns} rowKey="_id"  searchText={searchText} />
    </>
  );
};

export default ItemsTab;