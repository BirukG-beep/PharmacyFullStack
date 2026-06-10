import {Header , Body , TextWithDownload , P, S , Card , Short , Content , Logo , Span , Card2 ,Short2 , Card4 } from '../../components/HomePage/ChildComponent/HomeDashboard.js';
import { toggleClicked } from '../../Reducer/dashboardSlice.js';
import { useDispatch } from 'react-redux';
import { LogoFirst , SecondLogo } from './Icons/LogoIcons.jsx';
import {useReport} from "./hooks/useReport.js";
import {useTheme} from "../Authentications";
import CardItems from "./components/Card"

const HomeDashboard = () =>{

  const theme = useTheme();


  const {  totalSale, totalSalemount,} = useReport();
  
    const dispatch = useDispatch();
    const handleClickd = (value) => {
        dispatch(toggleClicked(value));
        console.log(clicked);
      };

 return(
    <div style={{backgroundColor:theme.backgroundColor  ,  height:"89vh" , boxSizing:"border-box" , display:"grid"}} className='overflow'>
    <Header>
      <TextWithDownload>
        <div>
        <P style={{color:theme.textColor}}>Reports</P>
        <S style={{color:theme.textColor}}>Overall reports related to the pharmacy.</S>
        </div>
        </TextWithDownload>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%"}} className='wrap'>
       <CardItems 
       value={totalSale.toFixed(2)}
       title='Total Sales Report'
       handleClickd={handleClickd}
       icon={<SecondLogo />}
       valueNavigation={9}
       />
       <CardItems 
       value={totalSalemount}
       title='Total Payment Report'
       handleClickd={handleClickd}
       icon={<LogoFirst />}
       valueNavigation={10}
       />
           <Card4 style={{display:"hidden", background:"transparent" , border:"none"}}></Card4>
           <Card4 style={{display:"hidden", background:"transparent" , border:"none"}}></Card4>
        </div>

    </Header>

    </div>
 )
}
export default HomeDashboard;