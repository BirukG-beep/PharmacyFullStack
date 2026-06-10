
export const useThemeStyles = (displaySettings) => {
  const isDarkTheme = displaySettings.theme === 'dark';

  const backgroundColor = isDarkTheme ? '#2c3e50' : '#f9f9f9';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';

  const adjustColor = (color, amount) => {
    let colorValue = parseInt(color.slice(1), 16);

    let r = (colorValue >> 16) + amount;
    let g = ((colorValue >> 8) & 0x00FF) + amount;
    let b = (colorValue & 0x0000FF) + amount;

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${(1 << 24 | r << 16 | g << 8 | b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

//   const sectionBackgroundColor = adjustColor(backgroundColor, 20);
  const sectionBackgroundColor = "#1d242e";

  const containerStyle = {
    display:"grid",
    gridTemplateColumns:"1fr 1fr 1fr",
    gap:'10px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor,
    color: textColor,
    height: '85vh',
    overflowY: 'auto',
    fontSize:
      displaySettings.fontSize === 'small'
        ? '12px'
        : displaySettings.fontSize === 'medium'
        ? '16px'
        : '20px',
  };

  return {
    containerStyle,
    borderColor,
    selectBorderColor,
    labelColor,
    sectionBackgroundColor,
  };
};