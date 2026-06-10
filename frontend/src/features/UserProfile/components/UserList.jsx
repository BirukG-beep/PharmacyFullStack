
import { Modal } from 'antd';
import { useUserProfile } from '../hooks';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
const UserList = ({searchTerm , handleSearchChange  }) =>{
  const [isAntdModalVisible, setIsAntdModalVisible] = useState(false);

  const {Delete} = useUserProfile();


      const {users  } = useUserProfile();
    const filteredData = users.filter(item => 
  item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase())
);


  const handleDelete = (item) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this item?',
      onOk: () => {
        // Call your delete function here
        Delete(item); // Make sure to define this function
        // Optionally close the modal if you opened it in a different context
        setIsAntdModalVisible(false);
      },
    });
  };

    return(
          <div>
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              margin: '10px -10px',
              marginLeft:"10px",
              padding: '8px',
              width: '40%',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <table className="admin-table" style={{marginLeft:"10px", marginRight:"10px" , boxSizing:"border-box"}}>
            <thead>
              <tr>
                <th>Profile Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img 
                      src={item.image || 'default-profile.png'} 
                      alt="Profile" 
                      className="profile-image" 
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="delete-button"   onClick={() => handleDelete(item.username)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ToastContainer />
        </div>
    )
}
export default UserList;