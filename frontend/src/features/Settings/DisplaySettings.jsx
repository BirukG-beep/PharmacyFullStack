import { FaSun, FaMoon } from 'react-icons/fa'; // Theme icons
import { AiOutlineFontSize } from 'react-icons/ai'; // Font size icon

const DisplaySettings = ({
  displaySettings,
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
      <h2 style={{ color: '#3498db' }}>Display Settings</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ color: labelColor , backgroundColor:"transaparent" ,  padding:"5px" }}>
 <div style={{backgroundColor:'white' , width:'fit-content' , padding:"5px" , borderRadius:"50%" , height:"40px" , width:"40px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>        <FaSun />  <FaMoon/> </div>Theme:
          <select
            name="theme"
            value={displaySettings.theme}
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
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label style={{  color: labelColor , backgroundColor:"transaparent" , borderRadius:"20px" , padding:"5px" }}>
        <div style={{width:"40px" , height:"40px" , display:"flex" , justifyContent:"center" , alignItems:'center' , backgroundColor:"white" , borderRadius:"50%"}}>
            <AiOutlineFontSize/>
        </div>  Font Size:
          <select
            name="fontSize"
            value={displaySettings.fontSize}
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
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default DisplaySettings;