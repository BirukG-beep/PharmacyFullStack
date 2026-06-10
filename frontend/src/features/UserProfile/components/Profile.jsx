

import { Button } from "antd";
import {useTheme} from "../../../hooks/useTheme"
const Profile = ({setIsEditing , setIsModalOpen , user}) =>
{
    const theme = useTheme();
    return ( 
<div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' , height:"fit-content" , display:"gird", gridTemplateColumns:"1fr 1fr" , gap:"20px"}}>
        <div style={{ marginBottom: '10px', display:"flex" ,  alignItems:"center" , gap:"10px" }}>
  <img 
    src={user.image ||'/defualt-image.avif'} 
    alt="Profile" 
    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', backgroundColor: "wheat" }} 
  />
   <div>
          <p style={{ color:theme.textColor , fontFamily:' "DM Sans", sans-serif'}}><strong style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor}}>Name:</strong> {user.username}</p>
          <p style={{ color:theme.textColor , fontFamily:' "DM Sans", sans-serif'}}><strong style={{fontFamily:' "DM Sans", sans-serif', color:theme.textColor}}>Role:</strong> {user.role}</p>
        
          </div>
</div>

         
          <div style={{display:"flex" , gap:"10px"}}>
          <Button 
            onClick={() => setIsEditing(true)} 
          >
            Edit
          </Button>
          {user.role === 'mainAdmin' &&( <Button onClick={() => setIsModalOpen(true)} >+</Button>)}
          </div>
        </div>

)}

export default Profile;