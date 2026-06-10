// UserProfile.js
import React, { useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../Reducer/userSlices';
import UpdateUserComponent from './components/UpdateUserComponent';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile";
import UserList from './components/UserList';
import {useTheme} from "../../hooks/useTheme"
// //import {FaName}from 'react-icons'
// import Modal from 'react-modal';
import AddModal from './components/AddModal';
const UserProfile = () => {
  const user = useSelector(selectUser);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleSave = (updatedUser) => {
    // Dispatch the action to update the user in the Redux store
    dispatch(setUser(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
 


  return (
    <div style={{  gap:"10px" , overflowY:"auto", height:"89vh" ,overflowX:"hidden", backgroundColor:theme.backgroundColor }}>
      {isEditing ? (
        <UpdateUserComponent user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
      <Profile setIsEditing={setIsEditing} setIsModalOpen={setIsModalOpen} user={user}/>
        {user.role === 'mainAdmin' && (
      <UserList  searchTerm = {searchTerm} handleSearchChange = {handleSearchChange} />
        )}

        </>
      )}
      
    <AddModal setIsModalOpen = {setIsModalOpen}  isModalOpen = {isModalOpen}  />

    </div>
    
  );
  
};

export default UserProfile;
