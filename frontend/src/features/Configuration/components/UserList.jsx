import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { List, Button, Modal, Form, Input } from 'antd';
import { useUser } from './hooks/useUser';
import { useTheme } from '../../../hooks/useTheme';
import ModalForm from './Modal';
const UsersList = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', address: '' });

  const { users, loading, error , deleteUser , editUser , isModalOpen , setIsModalOpen} = useUser();

  const {backgroundColor , textColor} = useTheme();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;



  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditFormData({ name: user.name, email: user.email, phone: user.phone, address: user.address });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };


  return (
    <div>
      <h3 style={{ color: textColor }}>User List</h3>
      <p style={{ color: textColor }}>The list of users</p>
      <List
        bordered
        dataSource={users}
        renderItem={user => (
          <List.Item>
            <div>
              <strong>Name:</strong> {user.name}<br />
              <strong>Email:</strong> {user.email}<br />
              <strong>Phone:</strong> {user.phone}<br />
              <strong>Address:</strong> {user.address}<br />
              <Button onClick={() => handleEditClick(user)} style={{ marginRight: '10px' }}>
                Edit
              </Button>
              <Button danger onClick={() => deleteUser(user._id)}>
                Delete
              </Button>
            </div>
          </List.Item>
        )}
      />
      <ModalForm isModalOpen={isModalOpen}  setIsModalOpen = {setIsModalOpen}  editUser = {editUser}  editFormData = {editFormData}  handleFormChange = {handleFormChange}/>
      <ToastContainer />
    </div>
  );
};

export default UsersList;
