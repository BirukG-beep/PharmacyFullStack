import { FaUserCheck } from "react-icons/fa";
const PrivacySettings = ({
  privacySettings,
  onChange,
  labelColor,
  selectBorderColor,
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
      <h2 style={{ color: '#3498db' }}>Privacy Settings</h2>

      <label style={{ color: labelColor }}>
       <div style={{backgroundColor:'white' , width:'fit-content' , padding:"5px" , borderRadius:"50%" , height:"40px" , width:"40px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}><FaUserCheck /></div>  Profile Visibility:
        <select
          value={privacySettings.profileVisibility}
          onChange={onChange}
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '4px',
            border: `1px solid ${selectBorderColor}`
          }}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </select>
      </label>
    </section>
  );
};

export default PrivacySettings;