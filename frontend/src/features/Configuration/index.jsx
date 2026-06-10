import React from 'react';
import { Form, InputNumber, Select, Switch, Card, Space, Typography } from 'antd';
import {FaCheck} from "react-icons/fa"
const { Title } = Typography;
const { Option } = Select;

const SettingsForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Submitted Configuration:', values);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', height: '89vh', overflowY: 'auto' }}>
      <Title level={3} style={{textAlign:"center"}}>Store Configuration</Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          taxRate: 0.02,
          currency: 'ETB',
          priceIncludesTax: false,
          lowStockThreshold: 10,
        }}
        style={{ maxWidth: 400 ,margin: "auto", position: "relative" , backgroundColor:"white" , padding:"24px" , borderRadius:"8px" }}
      >
        {/* Pricing & Tax Section */}
        <Card title="Pricing & Tax" style={{ marginBottom: 20 }}>
          <Form.Item 
            label="Tax Rate (%)" 
            name="taxRate"
            tooltip="Enter decimal value (e.g., 0.02 for 2%)"
          >
            <InputNumber 
              min={0} 
              max={1} 
              step={0.01} 
              formatter={(value) => `${value * 100}%`}
              parser={(value) => value.replace('%', '') / 100}
              style={{ width: '100%' }} 
            />
          </Form.Item>

          <Form.Item label="Currency" name="currency">
            <Select>
              <Option value="ETB">ETB (Ethiopian Birr)</Option>
              <Option value="USD">$ (US Dollar)</Option>
              <Option value="EUR">€ (Euro)</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            label="Price Includes Tax" 
            name="priceIncludesTax" 
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Card>

        <Form.Item style={{ marginTop: 10 }}>
          <button type="submit" className="ant-btn ant-btn-primary"  style={{ position: 'absolute', right: 0, backgroundColor:"green" ,border:"1.5px #ccc solid" , display:"flex" , alignItems:"center" , gap:"5px" , padding:"5px 12px" , borderRadius:"4px" , cursor:"pointer" , color:"white" }}>
             <FaCheck />
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsForm;