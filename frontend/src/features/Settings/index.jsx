import React from 'react';
import { useSettings } from './hooks/useSettings';
import DisplaySettings from './DisplaySettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import GeneralPreferences from './GeneralPreferences';
import { useThemeStyles } from './hooks/useThemeStyles';
const Settings = () => {

  const {settings , updateDisplay , updateNotification , updatePrivacy , updateAccount , updatePreferences} = useSettings();
  // Determine colors based on the selected theme
  const {
  containerStyle,
  borderColor,
  selectBorderColor,
  labelColor,
  sectionBackgroundColor
} = useThemeStyles(settings.displaySettings);

  const handleDisplayChange = (e) => {
    const { name, value } = e.target;
    updateDisplay({ [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    updateNotification({ [name]: checked });
  };

  const handlePrivacyChange = (e) => {
    updatePrivacy({ profileVisibility: e.target.value });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    updateAccount({ [name]: value });
  };

  const handleGeneralPreferencesChange = (e) => {
    const { name, value } = e.target;
    updatePreferences({ [name]: value });
  };

  return (
    <div style={{height:"89vh", position:"relative" , overflowX:"hidden"}}>
        <h1 style={{ color: 'inherit' }}>Settings</h1>
    <div style={{...containerStyle   , boxSizing:"border-box" , overflowX:"auto"}}>
    

      {/* Display Settings Section */}
    <DisplaySettings
  displaySettings={settings.displaySettings}
  onChange={handleDisplayChange}
  labelColor={labelColor}
  selectBorderColor={selectBorderColor}
  borderColor={borderColor}
  sectionBackgroundColor={sectionBackgroundColor}
/>
      {/* Notification Settings Section */}
  <NotificationSettings
  notificationSettings={settings.notificationSettings}
  onChange={handleNotificationChange}
  labelColor={labelColor}
  borderColor={borderColor}
  sectionBackgroundColor={sectionBackgroundColor}
/>
      {/* Privacy Settings Section */}
     {/* <PrivacySettings
  privacySettings={settings.privacySettings}
  onChange={handlePrivacyChange}
  labelColor={labelColor}
  selectBorderColor={selectBorderColor}
  borderColor={borderColor}
  sectionBackgroundColor={sectionBackgroundColor}
/> */}

 

      {/* General Preferences Section */}
    <GeneralPreferences
  generalPreferences={settings.generalPreferences}
  onChange={handleGeneralPreferencesChange}
  labelColor={labelColor}
  selectBorderColor={selectBorderColor}
  borderColor={borderColor}
  sectionBackgroundColor={sectionBackgroundColor}
/>

      <button 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#3498db', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '16px',
          position:"absolute",
          top:"10px",
          right:"2%"
        }}
        onClick={() => alert('Settings saved!')} // Add functionality as needed
      >
        Save 
      </button>
    </div>
    </div>
  );
};

export default Settings;
