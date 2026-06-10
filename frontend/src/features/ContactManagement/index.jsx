import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaPaperPlane } from 'react-icons/fa';
import './styles/contactManagement.css';
import { fetchContacts } from './services/fetchContacts';
import { onSubmit, handleEdit, handleDelete, handleEmail } from './utils/utilities';
import ContactForm from './components/ContactForm';
import { useForm } from "react-hook-form";
import {Table , Button , Space} from "antd";

import {useTheme} from "../../hooks/useTheme"
import {saveToServer} from "./services/saveToServer"
const ContactManagement = () => {

  const [contacts, setContacts] = useState([]);
  const [contactDisplay, setContactDisplay] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
    const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();
  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchContacts();
      // if (data) setContacts(Array.isArray(data) ? data : [data]);
      setContacts(data)
    };
    loadContacts();
  }, []);


const columns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Address",
    dataIndex: "adress", // keep same as backend
    key: "adress",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => new Date(date).toLocaleString(), // format date
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record, index) => (
      <Space>
        <Button
          onClick={() =>
            handleEdit(index, setEditIndex, reset, setContactDisplay, contacts)
          }
        >
          <FaEdit />
        </Button>

        <Button
          danger
          onClick={() => handleDelete(index, contacts, setContacts)}
        >
          <FaTrash />
        </Button>

        <Button onClick={() => handleEmail(record.email)}>
          <FaPaperPlane />
        </Button>
      </Space>
    ),
  },
];

const dataSource = contacts.map((contact, index) => ({
  key: index,
  username: contact.name,
  address: contact.adress,
  phone: contact.phone,
  createdAt: new Date(contact.createdAt).toLocaleString(),
  email: contact.email,
}));
  return (
    <div className={`container `}>
      {contactDisplay && (
        <ContactForm
          setContactDisplay={setContactDisplay}
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
          editIndex={editIndex}
          contacts={contacts}
          setContacts={setContacts}
          setEditIndex={setEditIndex}
          reset={reset}
          onSubmit={onSubmit} // pass the utility function
        />
      )}

      <button className="floatingBtn" onClick={() => setContactDisplay(true)}>
        <FaPlus />
      </button>

    <div className="listContainer">
  <h2>Contact List</h2>

  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{ pageSize: 5 }}
    style={{backgroundColor:"white"}}
  />
</div>
    </div>
  );
};

export default ContactManagement;