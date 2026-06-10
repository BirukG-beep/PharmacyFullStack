import { notification } from "antd";
import { add, get, deleteuser , edituser } from "../services.js";
import { useState, useEffect } from "react";

export const useCustomer = () => {
  const [customer, setCustomer] = useState([]);

  // Fetch customers on hook mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const result = await get();

        console.log(result.data)
        if (result.status === 200) setCustomer(result.data);
      } catch (error) {
        notification.error({ message: "Failed to fetch customers" });
      }
    };
    fetchCustomers();
  }, []);

  // Add customer
  const addCustomer = async ({ name, email, phone }) => {
    try {
      const result = await add({ name, email, phone });
      if (result.status === 200) {
        setCustomer(prev => [...prev, result.data]); // Add full object from backend
        notification.success({ message: "Customer added successfully" });
      }
    } catch (error) {
      notification.error({ message: "Failed to add customer" });
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    try {
      const res = await deleteuser(id);
      if (res.status === 200) {
        setCustomer(prev => prev.filter(c => c._id !== id));
        notification.success({ message: "Customer deleted successfully" });
      }
    } catch (error) {
      notification.error({ message: "Failed to delete customer" });
    }
  };

  const edit = async (value) =>{
    try{
       await edituser(value._id , value);
       setCustomer(prev => prev.filter(c => c._id !== value._id));
        notification.success({ message: "Customer deleted successfully" });
    } catch (error){
      console.log(error)
    }
    }
  return { customer, setCustomer, addCustomer, deleteCustomer , edit };
};