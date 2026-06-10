import { FaMailBulk } from 'react-icons/fa';
import { FaSms } from 'react-icons/fa';
const NotificationSettings = ({
  notificationSettings,
  onChange,
  labelColor,
  borderColor,
  sectionBackgroundColor
}) => {
  return (
    <section
      style={{
        marginBottom: '20px',
        padding: '20px',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        backgroundColor: sectionBackgroundColor
      }}
    >
      <h2 style={{ color: '#3498db' }}>Notification Settings</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ color: labelColor }}>
         <div style={{backgroundColor:'white' , width:'fit-content' , padding:"5px" , borderRadius:"50%" , height:"40px" , width:"40px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}><FaMailBulk /></div>  Email Notifications:
          <input
            type="checkbox"
            name="email"
            checked={notificationSettings.email}
            onChange={onChange}
            style={{ marginLeft: '10px', width:"20px" }}
          />
        </label>

        <label style={{ color: labelColor }}>
          <div style={{backgroundColor:'white' , width:'fit-content' , padding:"5px" , borderRadius:"50%" , height:"40px" , width:"40px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}><FaSms /></div>  
          SMS Notifications:
          <input
            type="checkbox"
            name="sms"
            checked={notificationSettings.sms}
            onChange={onChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
    </section>
  );
};

export default NotificationSettings;