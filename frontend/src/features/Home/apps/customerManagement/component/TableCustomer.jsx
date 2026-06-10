  
  import {filtered} from "../utils/filter"
  import { useState } from 'react';
  import { FaEdit, FaTrash } from 'react-icons/fa';
  import { Modal } from 'antd';

  import EditModal from './Modal'
  import { Table, Input, Button } from 'antd';

  const TableCustomer = ({customer , deleteCustomer}) => {

     const [searchTerm, setSearchTerm] = useState('');

     const [editingCustomer , setEditingCustomer] = useState(null)

     const [modal , setModal] = useState(false);


    const handleSearchChange = (event) => setSearchTerm(event.target.value);


    const filteredData = filtered(customer , searchTerm)

    const { confirm } = Modal;


    const showDeleteConfirm = (id) => {
  confirm({
    title: "Are you sure you want to delete this customer?",
    content: "This action cannot be undone.",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteCustomer(id);
    },
  });
};

    
  return(
    <div>
    <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
          />
          
          <Table
            dataSource={filteredData}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            className='customer'
          >
            <Table.Column title="Name" dataIndex="name" key="name" />
            <Table.Column title="Email" dataIndex="email" key="email" />
            <Table.Column title="Phone" dataIndex="phone" key="phone" />
            <Table.Column title="DateTime" dataIndex="dateTime" key="dateTime" />
            <Table.Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <>
                  <Button onClick={() => {
                  setEditingCustomer(record)
                  setModal(true)
                  }} icon={<FaEdit />} />
                  <Button onClick={() => showDeleteConfirm(record._id)} icon={<FaTrash />} style={{ marginLeft: '10px' }} />
                </>
              )}
            />
          </Table>
          {modal  && <EditModal  modal={modal} setModal={setModal} editingCustomer={editingCustomer} setEditingCustomer={setEditingCustomer}/>}
          <Modal />
          </div>
        )}

export default TableCustomer;