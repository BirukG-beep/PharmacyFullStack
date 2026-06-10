import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css'; 
import axios from 'axios';
import { Table, Input, Modal } from 'antd';
import {useNotification} from "./hooks"
import { getColumns } from './columns.jsx';
import { useTheme } from '../../hooks/useTheme.js';
const Notification = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const { medicines, loading, error, deleteMedicine } = useNotification();
  const theme = useTheme()

 
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;


const columns = getColumns(deleteMedicine);
 

  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', height:"89vh" , boxSizing:"border-box", backgroundColor:theme.backgroundColor , padding:"20px" , overflowY:"auto" }} className='notification'>

      {/* Search Input */}
      <Input
        placeholder="Search Medicines"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ fontFamily: '"DM Sans", sans-serif', color: theme.textColor }}
      />

      {/* Medicines Table */}
      <h2 style={{ color: theme.textColor ,  fontFamily: '"DM Sans", sans-serif', color: theme.textColor  , textAlign:"center"}}>Medicines</h2>
      
      <Table
        columns={columns}
        dataSource={filteredMedicines}
        rowKey="medicineId"
        pagination={false}
        style={{ backgroundColor:theme.backgroundColor, color: theme.textColor , fontFamily: '"DM Sans", sans-serif' }}
        className='table'
      />
      
      {/* Notify analysis time if the selected date is 10 */}
      {date.getDate() === 6 && (
        <div style={{ color: 'red', marginTop: '20px' , fontFamily: '"DM Sans", sans-serif' }}>
          Please note: Analysis time is required on the 10th of each month.
        </div>
      )}
    </div>
  );
};

export default Notification;
