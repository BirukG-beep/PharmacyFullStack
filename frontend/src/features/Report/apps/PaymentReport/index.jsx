// PaymentReport.js
import { useState } from 'react';
import { Table, Input, Select, DatePicker, Space } from 'antd';
import { FaPills, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import dayjs from 'dayjs';
import EllipsisMenu2 from './EllipsisMenu2';

import { useFetchTransaction } from './hooks/fetchTransaction';
import { useThemeHook } from './hooks/useThemeHook';
import { columns } from './helper/columns.jsx';
import { filterDatas } from './helper/filterData';   // ← will be updated below


const { Option } = Select;

const PaymentReport = () => {
  const [filters, setFilters] = useState({ Method: '', name: '', date: null });
  const [currentPage, setCurrentPage] = useState(1);

 const { transactions, loading, error } = useFetchTransaction();
  console.log(transactions)
  const { backgroundColor, textColor } = useThemeHook();

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ← Fixed: pass both data + filters
  const filteredData = filterDatas(transactions, filters);

  // Loading & Error handling (proper early return)
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading transactions...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{ padding: '20px', backgroundColor, color: textColor ,overflowY:"auto" , height:"89vh"  }}
      className="newTable"
    >
      <h2 style={{ textAlign: 'center', color: textColor }}>Payment Report</h2>

      <Space
        style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}
        className="split"
      >
        <div>
          <FaPills style={{ marginRight: '8px' }} />
          <Input
            placeholder="Search by Medicine Name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            style={{ width: 200 }}
          />
        </div>

        <div>
          <FaCalendarAlt style={{ marginRight: '8px' }} />
          <DatePicker
            value={filters.date ? dayjs(filters.date) : null}
            onChange={(date) => handleFilterChange('date', date ? date.format('YYYY-MM-DD') : null)}
            style={{ width: 200 }}
            placeholder="Search by Date"
          />
        </div>

        <div>
          <FaDollarSign style={{ marginRight: '8px' }} />
          <Select
            placeholder="Select Payment Method"
            value={filters.Method}
            onChange={(value) => handleFilterChange('Method', value)}
            style={{ width: 200 }}
          >
            <Option value="">All</Option>
            <Option value="Credit Card">Credit Card</Option>
            <Option value="Cash">Cash</Option>
            <Option value="Debit Card">Debit Card</Option>
          </Select>
        </div>
      </Space>

     <Table
  columns={columns}
  dataSource={filteredData}
  rowKey={(record) => record._id}
  pagination={{
    pageSize: 5,
    showSizeChanger: false,
    current: currentPage,                 // ✅ dynamic
    total: filteredData.length,
    onChange: (page) => setCurrentPage(page),  // ✅ update page
  }}
  style={{ overflowX: 'auto', backgroundColor: 'white' }}
/>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px' }}>
        <EllipsisMenu2 data={filteredData} />
      </div>
    </div>
  );
};

export default PaymentReport;