
import { useSelector } from 'react-redux'; 
 export const useThemeHook = () =>{
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  return {backgroundColor , textColor}
 }
