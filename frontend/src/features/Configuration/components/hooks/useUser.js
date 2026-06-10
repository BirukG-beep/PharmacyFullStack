import { useState, useEffect } from "react";
import { loadUser , DeleteUser , EditUser } from "../services";
import {  toast } from 'react-toastify';
export const useUser = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const result = await loadUser();
        setUsers(result.data);

      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const deleteUser = async (id) => {
   try{
   await DeleteUser(id);
   setUsers(users.filter(user => user._id !== id));
     toast.success('User deleted successfully!');
      } catch (err) {
        console.error('Error deleting user:', err);
        toast.error('Error deleting user');
      }

    }

     const editUser = async (values , id) => {
        try {
          await EditUser(id , values)
          setUsers(users.map(user => user._id === id ? response.data : user));
          setIsModalOpen(false);
          toast.success('User updated successfully!');
        } catch (err) {
          console.error('Error updating user:', err);
          toast.error('Error updating user');
        }
      };
    

  return { users, loading, error , deleteUser , editUser , isModalOpen , setIsModalOpen };
};