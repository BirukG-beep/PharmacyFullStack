import React, { useState } from "react";
import { Form, Input, InputNumber, DatePicker, Button, Select, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FaPills, FaDollarSign, FaCalendarAlt, FaBoxes, FaTag } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import axios from "axios";
import dayjs from "dayjs";

import { useCosmoData } from "../hooks/useCosmoData";

const { Option } = Select;

const CreateItem = ({ setCosmo }) => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { postCosmo } = useCosmoData();

  const handleValuesChange = (_, allValues) => {
    const { quantity, price } = allValues;
    if (quantity && price) {
      const total = quantity * price;
      setTotalPrice(total);
      form.setFieldsValue({ totalPrice: total });
    } else {
      setTotalPrice(0);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        expireDate: values.expireDate.toISOString(),
      };
      await postCosmo(payload);
      message.success("Item created successfully!");
      form.resetFields();
      setTotalPrice(0);
    } catch (error) {
      console.error(error);
      message.error("Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 90000,
        animation: "fadeIn 0.3s ease-out",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        padding: "16px",
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <button
        onClick={() => setCosmo(false)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          fontSize: "16px",
          transition: "all 0.2s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <CloseOutlined />
      </button>

      <div
        id="create-item-modal"
        style={{
          width: "100%",
          maxWidth: "350px",
          maxHeight: "90vh",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.2)",
          overflow: "auto",
          animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#f8fafc",
            padding: "20px 24px",
            color: "#1e293b",
            borderBottom: "1px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <MdOutlineMedicalServices style={{ fontSize: "26px", color: "#475569" }} />
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 600, letterSpacing: "-0.2px" }}>
              Create New Item
            </h2>
          </div>
          <p style={{ margin: "6px 0 0 0", color: "#64748b", fontSize: "13px" }}>
            Fill in the details to add a new pharmaceutical item
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={handleValuesChange}
          style={{ padding: "20px 24px 24px", flex: 1 }}
        >
          {/* Item Name */}
          <Form.Item
            name="name"
            label={
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                <FaPills style={{ fontSize: "14px", color: "#475569" }} /> Item Name
              </span>
            }
            rules={[{ required: true, message: "Please enter name" }]}
            style={{ marginBottom: "18px" }}
          >
            <Input
              placeholder="e.g., Paracetamol 500mg"
              size="large"
              prefix={<FaTag style={{ color: "#94a3b8", fontSize: "14px" }} />}
              style={{
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                padding: "5px 14px",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.boxShadow = "none";
              }}
            />
          </Form.Item>

          {/* Type */}
          <Form.Item
            name="type"
            label={
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                <FaBoxes style={{ fontSize: "14px", color: "#475569" }} /> Type
              </span>
            }
            rules={[{ required: true, message: "Please select type" }]}
            style={{ marginBottom: "7px" }}
          >
            <Select
              placeholder="Select type"
              size="large"
              style={{ borderRadius: "10px" }}
              dropdownStyle={{ borderRadius: "10px" }}
              getPopupContainer={() => document.getElementById("create-item-modal")}
            >
              <Option value="tablet">💊 Tablet</Option>
              <Option value="syrup">🍯 Syrup</Option>
              <Option value="injection">💉 Injection</Option>
            </Select>
          </Form.Item>

          {/* Quantity & Price Row */}
          <div style={{ display: "flex", gap: "14px", marginBottom: "18px" }}>
            <Form.Item
              name="quantity"
              label={
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                  <FaBoxes style={{ fontSize: "14px", color: "#475569" }} /> Quantity
                </span>
              }
              rules={[{ required: true, message: "Enter quantity" }]}
              style={{ flex: 1, marginBottom: 0 }}
            >
              <InputNumber
                min={1}
                size="large"
                style={{ width: "100%", borderRadius: "10px", padding: "0px 11px" }}
                placeholder="Qty"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label={
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                  <FaDollarSign style={{ fontSize: "14px", color: "#475569" }} /> Price
                </span>
              }
              rules={[{ required: true, message: "Enter price" }]}
              style={{ flex: 1, marginBottom: 0 }}
            >
              <InputNumber
                min={0}
                size="large"
                style={{ width: "100%", borderRadius: "10px", padding: "0px 11px" }}
                placeholder="Price"
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                prefix={<FaDollarSign style={{ color: "#94a3b8", marginRight: "4px" }} />}
              />
            </Form.Item>
          </div>

          {/* Expire Date */}
          <Form.Item
            name="expireDate"
            label={
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                <FaCalendarAlt style={{ fontSize: "14px", color: "#475569" }} /> Expire Date
              </span>
            }
            rules={[{ required: true, message: "Select expire date" }]}
            style={{ marginBottom: "18px" }}
          >
            <DatePicker
              style={{ width: "100%", borderRadius: "10px", padding: "7px 12px" }}
              size="large"
              placeholder="Select expiration date"
              disabledDate={(current) => current && current < dayjs().startOf("day")}
              suffixIcon={<FaCalendarAlt style={{ color: "#94a3b8" }} />}
              getPopupContainer={() => document.getElementById("create-item-modal")}
            />
          </Form.Item>

          {/* Submit Button - NOW INLINE, NO ABSOLUTE */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                background: "#3b82f6",
                border: "none",
                boxShadow: "0 2px 6px rgba(59,130,246,0.2)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(59,130,246,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(59,130,246,0.2)";
              }}
            >
              ✨ Create Item
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateItem;