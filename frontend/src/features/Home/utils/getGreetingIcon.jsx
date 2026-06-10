
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
export    const getGreetingIcon = () => {
        const hours = new Date().getHours();
        return hours < 12 ? <NightsStayIcon color='yellow' /> : <WbSunnyIcon style={{color:"yellow"}} />;
    };