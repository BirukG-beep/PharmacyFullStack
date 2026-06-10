import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../../../../../Reducer/dashboardSlice';
import { setSelectedMedicine } from '../../../../../../Reducer/MedicineSlice';
import { Modal as AntdModal, notification, Table, Button } from 'antd';
import { useListMedicine } from '../../../sharedFiles/hooks/useListMedicine';
import API from '../../../../../../services/api';
import {useTheme} from "../../../../../../hooks/useTheme"

const MedicineTable = ({ searchTerm, filterOption }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();

  const {medicines , Loading , error} = useListMedicine()




  useEffect(()=>{
   const fetchedData = medicines.map(item => ({
          ...item,
          action: 'View Full Detail',
          delete: 'Delete',
        }));
        setData(fetchedData);
  },[medicines])

  // Filter data based on search term and filter option
  const filteredData = data.filter(item => {
    const matchesSearch = searchTerm
      ? item.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesFilter = filterOption
      ? item.medicineGroup === filterOption
      : true;
    return matchesSearch && matchesFilter;
  });

  const handleClick = (medicine) => {
    dispatch(setSelectedMedicine(medicine));
  };

  const handleDelete = (medicineId) => {
    AntdModal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this item?',
      onOk: async () => {
        try {
          await API.delete(`/medicines/${medicineId}`);
          // Update data after deletion
          setData(prevData => prevData.filter(item => item.medicineId !== medicineId));
          notification.success({
            message: 'Deletion Successful',
            description: 'The item has been successfully deleted.',
          });
        } catch (error) {
          console.error('Error deleting medicine:', error);
          notification.error({
            message: 'Deletion Failed',
            description: 'There was an error deleting the item. Please try again later.',
          });
        }
      },
    });
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: 'Medicine ID',
      dataIndex: 'medicineId',
      key: 'medicineId',
    },
    {
      title: 'Group Name',
      dataIndex: 'medicineGroup',
      key: 'medicineGroup',
    },
    {
      title: 'Total Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Batch Number',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            handleClick(record);
            dispatch(toggleClicked(28)); // Example value, adjust as needed
          }}
        >
          {record.action}
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Button
          type="link"
          style={{ color: 'red' }}
          onClick={() => handleDelete(record._id)}
        >
          {record.delete}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
        onRow={(record) => ({
          onMouseEnter: e => (e.currentTarget.style.transform = 'scale(1.02)'),
          onMouseLeave: e => (e.currentTarget.style.transform = 'scale(1)'),
        })}
      />
    </div>
  );
};

export default MedicineTable;
