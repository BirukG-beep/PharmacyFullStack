import { Modal, Button, Input, Form, Space } from 'antd';
import { useState } from 'react';
import { validatePhone } from '../utils/validatePhone';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const AddModal = ({ isModalOpen, setIsModalOpen, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

 const handlePhoneChange = (e) => {
  const value = e.target.value;
  
  const error = validatePhone(value);   // validate every keystroke
  
  setPhone(value);          // ← ALWAYS update
  setPhoneError(error);     // show error if any
};

  const handleModalSave = async () => {
    if (phoneError) {
      // Optionally show a message if phone is invalid
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/user/register', {
        username: newUsername,
        password: newPassword,
        phone,
      });

      if (res.status === 200 || res.status === 201) {
        // Success - close modal and refresh list
        setIsModalOpen(false);
        if (onSuccess) onSuccess(); // Callback to refresh parent data
        // Reset form fields
        setNewUsername('');
        setNewPassword('');
        setPhone('');
        setPhoneError('');
      } else if (res.status === 400) {
        alert('User already exists or invalid data');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // Optionally reset form fields on cancel
    setNewUsername('');
    setNewPassword('');
    setPhone('');
    setPhoneError('');
  };

  return (
    <Modal
      title="Add New User"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={400}
      style={{ top: 20 }}
      bodyStyle={{ padding: '24px 24px 12px' }}
    >
      <Form layout="vertical" style={{ width: '100%' }}>
        <Form.Item
          label="Username"
          rules={[{ required: true, message: 'Please input username!' }]}
          style={{ marginBottom: 20 }}
        >
          <Input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter username"
            size="large"
            style={{ borderRadius: 6 }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[{ required: true, message: 'Please input password!' }]}
          style={{ marginBottom: 20 }}
        >
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter password"
            size="large"
            style={{ borderRadius: 6 }}
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          validateStatus={phoneError ? 'error' : ''}
          help={phoneError && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ExclamationCircleOutlined style={{ fontSize: 12 }} />
              {phoneError}
            </span>
          )}
          style={{ marginBottom: 24 }}
        >
          <Input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            size="large"
            style={{ borderRadius: 6 }}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
          <Button onClick={handleCancel} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleModalSave}
            loading={loading}
            size="large"
            style={{ minWidth: 80 }}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddModal;