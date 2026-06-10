import { Card , Short , Content , Logo , Span , Short4   ,  HeaderBody ,  Pmain , Psmall} from '../../../components/HomePage/ChildComponent/HomeDashboard.js';
import {   Navigate   } from '../Icon/HomeIcon.jsx';
export const Cards = ({icon, value , title , navigationValue , handleClickd , navigationTitle }) =>{

      let borderStyle = {}; // initialize as an object
  let shortStyle ={};
  if (title === 'Medicine available') {
    borderStyle = { border: '2px solid #55b975' };
    shortStyle = { borderTop:'2px solid #55b975', backgroundColor: '#a6daca',fontFamily: '"DM Sans", sans-serif'  };
  } else if (title === 'Medicine Groups') {
    borderStyle = { border:  '3px solid #40c0f7' };
    shortStyle = { borderTop:'2px solid #40c0f7', backgroundColor: '#a7dbf5',fontFamily: '"DM Sans", sans-serif'  };
  } else if (title === 'Medicine Shortage') {
    borderStyle = { border: '3px solid #eec2c1' };
    shortStyle = { borderTop:'2px solid #f38584', backgroundColor: '#edbebe',fontFamily: '"DM Sans", sans-serif'  };
  }

    return (
            <Card style={borderStyle}>
                    <Logo>
                       {icon}
                    </Logo>
                    <div>
                    <Content> {value}</Content>
                    <Span>{title}</Span>
                    </div>
                   
        
                    <Short style={shortStyle} onClick={()=>handleClickd(navigationValue)}>{navigationTitle} <span style={{ paddingLeft:"5px"}}><Navigate /></span> </Short>
                   </Card>
    ) 
}