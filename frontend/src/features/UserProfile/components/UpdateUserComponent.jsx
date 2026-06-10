import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {updateUser} from "../services"
const UpdateUserComponent = ({ user, onSave, onCancel }) => {
  const [id, setId] = useState(user._id); // Initialize _id in state
  const [name, setName] = useState(user.username);
  const [password, setPassword] = useState(user.password || ''); // Initialize password
  const [image, setImage] = useState(user.image || ''); // Initialize image
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate('/');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview as base64 string
        setImageFile(file); // Store the file for further use
      };
      reader.readAsDataURL(file); // Convert the file to base64 for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = user._id;
    try {
      // Send data to backend using axios
      const response = updateUser({id, username:name , password })
      onSave(response.data); // Pass the updated user data to parent
    } catch (error) {
      // Handle error response
      console.error('Error updating user:', error);
    }
    navigate('/')
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <img
            src={image || 'default-profile.png'}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <label htmlFor="image-upload" style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#007bff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            +
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <label>
          User ID:
          <input
            type="text"
            value={id}
            readOnly
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            type="submit" 
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
          >
            Save
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#6c757d', color: '#fff', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserComponent;
