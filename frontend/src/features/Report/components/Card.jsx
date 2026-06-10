import { Logo, Span, Content, Short, Card as CardWrapper } 
  from "../../../components/HomePage/ChildComponent/HomeDashboard";
import { NavIcon } from "../Icons/LogoIcons";

const Card = ({ value, title, icon, handleClickd, valueNavigation }) => {

    let borderStyle = {}; // initialize as an object
  let shortStyle ={};
  if (title === 'Total Saless Report') {
    borderStyle = { border: '2px solid #55b975' };
    shortStyle = { borderTop:'2px solid #55b975', backgroundColor: '#a6daca',fontFamily: '"DM Sans", sans-serif'  };
  } else if (title === 'Total Sales Report') {
    borderStyle = { border:  '3px solid #40c0f7' };
    shortStyle = { borderTop:'2px solid #40c0f7', backgroundColor: '#a7dbf5',fontFamily: '"DM Sans", sans-serif'  };
  } else if (title === 'Total Payment Report') {
    borderStyle = { border: '3px solid #eec2c1' };
    shortStyle = { borderTop:'2px solid #f38584', backgroundColor: '#edbebe',fontFamily: '"DM Sans", sans-serif'  };
  }

  return (
    <CardWrapper style={borderStyle}>
      <Logo>{icon}</Logo>

      <div>
        <Content>{value}</Content>
        <Span>{title}</Span>
      </div>

      <Short onClick={() => handleClickd(valueNavigation)} style={shortStyle}>
        View Detailed Report
        <span style={{ paddingLeft: "5px" }}>
          <NavIcon />
        </span>
      </Short>
    </CardWrapper>
  );
};

export default Card;