import { useSelector } from 'react-redux';

export const useTheme = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';

  return {
    backgroundColor: isDarkTheme ? '#2c3e50' : '#edf1f5',
    textColor:       isDarkTheme ? '#ecf0f1' : '#2c3e50',
    // borderColor, selectBorderColor, labelColor were NEVER used → removed (dead code)
  };
};