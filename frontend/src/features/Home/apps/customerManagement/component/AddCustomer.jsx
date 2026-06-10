import { useState } from "react";
import { Input, Button, Form, Modal } from "antd";

const AddCustomer = ({ setForm, addCustomer }) => {
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });

  const handleAddCustomer = () => {
    const { name, email, phone } = newCustomer;
    if (!name || !email || !phone) return; // simple validation
    addCustomer({ name, email, phone });
    setForm(false);
  };

  return (
    <div style={{backdropFilter:"blur(20px)"}}>
    <Modal
      title="Add Customer"
      open={true}
      onCancel={() => setForm(false)}
      footer={null}
      centered
      style={{ maxWidth: "250px" }}
      bodyStyle={{
      
        borderRadius: "8px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Form layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="Name" style={{ color: "#a0aec0", marginBottom: "5px" }}>
          <Input
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="Name"
            style={{
              border: "1px solid #3b4b60",
              borderRadius: "5px",
              color: "#fff",
            }}
          />
        </Form.Item>

        <Form.Item label="Email" style={{ color: "#a0aec0", marginBottom: "5px" }}>
          <Input
            type="email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            placeholder="Email"
            style={{
              border: "1px solid #3b4b60",
              borderRadius: "5px",
              color: "#fff",
            }}
          />
        </Form.Item>

        <Form.Item label="Phone" style={{ color: "#a0aec0", marginBottom: "5px" }}>
          <Input
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            placeholder="Phone"
            style={{
              border: "1px solid #3b4b60",
              borderRadius: "5px",
              color: "#fff",
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          onClick={handleAddCustomer}
          style={{
            backgroundColor: "#4a90e2",
            border: "none",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          Add Customer
        </Button>
      </Form>
    </Modal>
    </div>
  );
};

export default AddCustomer;