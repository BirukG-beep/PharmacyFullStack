import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs'; // Import dayjs
const { Option } = Select;
import {useMedicineForm} from "./hooks"
const FormWrapper = () => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineDescription, setMedicineDescription] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [medicineGroup, setMedicineGroup] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [soldIn, setSoldIn] = useState('pk');
  const [stripPerPk, setStripPerPk] = useState(1);
  const [tabletsPerStrip, setTabletsPerStrip] = useState(1);
  const [quantity, setTotalQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState(null);
  const {handleSubmit , data} = useMedicineForm();
  const [supplierId, setSupplierId] = useState('');

  useEffect(() => {
    setMedicineId(`MED${new Date().getTime()}`);
  }, []);

  useEffect(() => {
    if (unit === 'tablet') {
      setSoldIn('pk');
      setStripPerPk('');
      setTabletsPerStrip('');
      setPrice('');
    }
  }, [unit]);

const Submit = () => {
  const formattedExpirationDate = expirationDate
    ? expirationDate.toISOString()
    : null;

  handleSubmit({
    medicineName,
    medicineId,
    batchNumber,
    medicineGroup,
    medicineDescription,
    unit,
    price,
    soldIn,
    stripPerPk,
    tabletsPerStrip,
    quantity,
    expirationDate: formattedExpirationDate,
    supplierId,
  });

  // Reset fields
  setMedicineName("");
  setMedicineDescription("");
  setBatchNumber("");
  setPrice("");
  setUnit("");
  setSoldIn("pk");
  setStripPerPk("");
  setTabletsPerStrip("");
  setTotalQuantity(0);
  setExpirationDate(null);
  setSupplierId("");
};

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', height: `89vh`, overflowY:"auto" }}>
      <Form layout="vertical" onFinish={Submit}>
        <Form.Item label="Medicine ID" required>
          <Input value={medicineId} readOnly />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Medicine Name" required>
              <Input
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                required
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Unit" required>
              <Select
                value={unit}
                onChange={(value) => setUnit(value)}
                placeholder="Select Unit"
                required
              >
                <Option value="tube">Tube</Option>
                <Option value="amp">Amp</Option>
                <Option value="tablet">Tablet</Option>
                <Option value="bottle">Bottle</Option>
                <Option value="capsule">Capsule</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Price" required>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Item>
          </Col>
        </Row>

        {unit === 'tablet' && (
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Tablets per Strip" required>
                <Input
                  type="number"
                  value={tabletsPerStrip}
                  onChange={(e) => setTabletsPerStrip(e.target.value)}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Strips per Pack" required>
                <Input
                  type="number"
                  value={stripPerPk}
                  onChange={(e) => setStripPerPk(e.target.value)}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sold In" required>
                <Select
                  value={soldIn}
                  onChange={(value) => setSoldIn(value)}
                >
                  <Option value="pk">PK</Option>
                  <Option value="strip">Strip</Option>
                  <Option value="tablet">Tablet</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Total Quantity" required>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
                required
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Medicine Group" required>
              <Select
                value={medicineGroup}
                onChange={(value) => setMedicineGroup(value)}
                required
              >
                <Option value="" disabled>Select a group</Option>
                <Option value="Group A">Group A</Option>
                <Option value="Group B">Group B</Option>
                <Option value="Group C">Group C</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Batch Number" required>
              <Input
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                required
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Medicine Description" required>
              <Input.TextArea
                value={medicineDescription}
                onChange={(e) => setMedicineDescription(e.target.value)}
                required
                rows={4}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
           <p style={{paddingBottom:"10px"}}> Date</p>
          <DatePicker
          value={expirationDate ? dayjs(expirationDate) : null} // Use dayjs for value
          onChange={(date) => setExpirationDate(date)} // Store dayjs object
          required
        />
          </Col>
        </Row>

<Row>

   <Form.Item label="Supplier" style={{ width: "100%" }}>
  <Select
    value={supplierId}
    onChange={(value) => setSupplierId(value)}
    placeholder="Select pharmacist"
    style={{ width: "100%" , color:"#ccc" }}
  >
    {data.map((item) => (
      <Option key={item._id} value={item._id}>
        {item.name}
      </Option>
    ))}
  </Select>
</Form.Item>
</Row>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormWrapper;
