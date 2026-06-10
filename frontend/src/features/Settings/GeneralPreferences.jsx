import { FaLanguage , FaClock } from "react-icons/fa";
const GeneralPreferences = ({
  generalPreferences,
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
      <h2 style={{ color: '#3498db' }}>General Preferences</h2>

      <label style={{ color: labelColor }}>
       <div style={{backgroundColor:'white' , width:'fit-content' , padding:"5px" , borderRadius:"50%" , height:"40px" , width:"40px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}><FaLanguage /> </div> Language:
        <select
          name="language"
          value={generalPreferences.language}
          onChange={onChange}
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '4px',
            border: `1px solid ${selectBorderColor}`,
              backgroundColor:"#0b0f1c",
              color:"#b7c8de"
          }}
        >
          <option value="English">English</option>
          <option value="Amharic">Amharic</option>
          <option value="French">French</option>
        </select>
      </label>

      <label style={{ color: labelColor }}>
       <div style={{backgroundColor:'white' , width:'fit-content' , padding:"5px" , borderRadius:"50%" , height:"40px" , width:"40px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}><FaClock /> </div>  Time Zone:
        <select
          name="timeZone"
          value={generalPreferences.timeZone}
          onChange={onChange}
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '4px',
            border: `1px solid ${selectBorderColor}`,
              backgroundColor:"#0b0f1c",
              color:"#b7c8de"
          }}
        >
          <option value="GMT">GMT</option>
          <option value="PST">PST</option>
          <option value="EST">EST</option>
        </select>
      </label>
    </section>
  );
};

export default GeneralPreferences;