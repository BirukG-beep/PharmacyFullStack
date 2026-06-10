import React, { useState } from "react";
import { Table, Typography, Tag, Input, DatePicker, Space, Button } from "antd";
import styled from "styled-components";
import { useMedicine } from "./hooks";
import { FaPills } from "react-icons/fa";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Container = styled.div`
  padding: 20px;
  background: #f5f7fa;
  height: 89vh;
  overflow-y: auto;
`;

const StyledCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Example = () => {
  const { medicines } = useMedicine();
  const pharmacist = useSelector((state) => state.pharmacist.pharmacist);

  // Local state for filtering
  const [searchName, setSearchName] = useState("");
  const [searchBatch, setSearchBatch] = useState("");
  const [dateRange, setDateRange] = useState([]);

  // Filtered medicines
  const filteredMedicines = medicines
    .filter((m) =>
      m.medicineName.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((m) =>
      m.batchNumber?.toLowerCase().includes(searchBatch.toLowerCase())
    )
    .filter((m) => {
      if (dateRange.length === 2) {
        const created = dayjs(m.createdAt);
        return (
          created.isAfter(dayjs(dateRange[0]).startOf("day")) &&
          created.isBefore(dayjs(dateRange[1]).endOf("day"))
        );
      }
      return true;
    });

  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "medicineName",
      key: "medicineName",
      sorter: (a, b) => a.medicineName.localeCompare(b.medicineName),
    },
    {
      title: "ID",
      dataIndex: "medicineId",
      key: "medicineId",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      render: (unit) => <Tag color="blue">{unit}</Tag>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Price (ETB)",
      dataIndex: "price",
      key: "price",
      render: (price) => <strong>{price} Birr</strong>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Batch",
      dataIndex: "batchNumber",
      key: "batchNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  return (
    <Container>
      <StyledCard>
        <Title level={3} style={{ textAlign: "center" }}>
          MEDICINE SUPPLIER BY {pharmacist}
        </Title>
        <Title level={3} style={{ textAlign: "center" }}>
          <FaPills size={24} color="#1d242e" /> MEDICINE LIST
        </Title>

        {/* Filters */}
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Search Medicine Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            allowClear
          />
          <Input
            placeholder="Search Batch Number"
            value={searchBatch}
            onChange={(e) => setSearchBatch(e.target.value)}
            allowClear
          />
          <RangePicker
            onChange={(dates) => setDateRange(dates || [])}
            allowClear
          />
          <Button onClick={() => { setSearchName(""); setSearchBatch(""); setDateRange([]); }}>
            Reset Filters
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredMedicines}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      </StyledCard>
    </Container>
  );
};

export default Example;