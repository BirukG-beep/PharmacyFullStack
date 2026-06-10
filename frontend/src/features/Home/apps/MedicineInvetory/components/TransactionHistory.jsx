import { useState } from "react";
import {  Input, Select, Table  } from 'antd';
const { Option } = Select;
import { useTheme } from "../../../../../hooks/useTheme";
const TransactionHistory = ({history}) =>{
     const [pharmacistFilter, setPharmacistFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const theme = useTheme();
    const filteredHistory = history.filter(item => {
    return (
      (pharmacistFilter ? item.saler.includes(pharmacistFilter) : true) &&
      (nameFilter ? item.medicineName.includes(nameFilter) : true) &&
      (dateFilter ? new Date(item.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true)
    );
  });

    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        render: (date) => new Date(date).toLocaleString(),
      },
      {
        title: 'Name',
        dataIndex: 'medicineName',
      },
      {
        title: 'Quantity Sold',
        dataIndex: 'quantity',
      },
      {
        title: 'Total Amount',
        dataIndex: 'price',
        render: (amount) => `$${(amount || 0).toFixed(2)}`,
      },
      {
        title: 'Pharmacist',
        dataIndex: 'saler',
      },
    ];
  
   
  

   return(<>
         <h2 style={{ textAlign: "center" }}>Transaction History</h2>
                    <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                      <Select placeholder="Filter by Pharmacist" onChange={setPharmacistFilter} style={{ width: '200px', marginRight: '16px' }}>
                        {Array.from(new Set(history.map(item => item.saler))).map(pharmacist => (
                          <Option key={pharmacist} value={pharmacist}>{pharmacist}</Option>
                        ))}
                      </Select>
                      <Select placeholder="Filter by Medicine Name" onChange={setNameFilter} style={{ width: '200px', marginRight: '16px' }}>
                        {Array.from(new Set(history.map(item => item.medicineName))).map(name => (
                          <Option key={name} value={name}>{name}</Option>
                        ))}
                      </Select>
                      <Input type="date" onChange={(e) => setDateFilter(e.target.value)} style={{ width: '200px', marginRight: '16px' }} />
                    </div>
                    <Table
                      dataSource={filteredHistory}
                      columns={columns}
                      rowKey="date"
                      pagination={{ pageSize: 5 }}
                      style={{ backgroundColor: theme.isDarkTheme ? '#34495e' : 'transparent' }}
                    />
                    </>
    )
}

export default TransactionHistory;