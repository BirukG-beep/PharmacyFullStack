import React, { useState } from "react";
import { Table, Button, Modal, Form, InputNumber } from "antd";
import {useCart} from "../hooks/useCart";

const SalesTab = ({ data, onSale  }) => {
  const [saleVisible, setSaleVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [soldQuantity, setSoldQuantity] = useState(0);

  const {addToCart} = useCart();

  // Open modal
  const handleOpenSale = (record) => {
    console.log(record);
    setSelectedItem(record);
    setSaleVisible(true);
  
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!selectedItem) return;

    if (soldQuantity > selectedItem.quantity) {
      Modal.error({
        title: "Error",
        content: "Sold quantity exceeds available quantity!",
      });
      return;
    }

      addToCart(selectedItem, soldQuantity);
    await onSale({
      item: selectedItem,
      quantity: soldQuantity,

    });

    // reset state
    setSaleVisible(false);
    setSoldQuantity(0);
    setSelectedItem(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Type", dataIndex: "type" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Expire Date", dataIndex: "expireDate" },
    { title: "Price", dataIndex: "price" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Price", dataIndex: "totalPrice" },
    {
      title: "Action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleOpenSale(record)}>
          Sale
        </Button>
      ),
    },
  ];

  return (
    <>
      <h3>Sales Data</h3>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      {/* SALE MODAL */}
      <Modal
        title={`Sell ${selectedItem?.name || ""}`}
        open={saleVisible}
        onCancel={() => setSaleVisible(false)}
        onOk={handleSubmit}
        okText="Confirm Sale"
      >
        <Form layout="vertical">
          <Form.Item label="Quantity Sold" required>
            <InputNumber
              min={1}
              max={selectedItem?.quantity}
              value={soldQuantity}
              onChange={setSoldQuantity}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SalesTab;