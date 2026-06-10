import {Header  , TextWithDownload , P, S ,  Card4 } from '../../../components/HomePage/ChildComponent/HomeDashboard.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleClicked } from '../../../Reducer/dashboardSlice.js';
import { MedicineAvalable  , Shortage , MedicineGroup } from '../Icon/HomeIcon.jsx';
import { Button } from 'antd';
import {Cards} from "../components/Cards.jsx"
import {useTheme} from "../../../hooks/useTheme.js"
export const Inventory = () =>{
  const theme = useTheme();
      const user = useSelector((state) => state.user);
  const num = useSelector((state) => state.medstype.madicine); // Correctly using 'medstype'
  const group = useSelector((state) => state.medstype.group);



    const short = useSelector((state) => state.medstype.shortage);
    const dispatch = useDispatch();
    const handleClickd = (value) => {
       dispatch(toggleClicked(value));
     };

    return(   
    <div style={{backgroundColor:theme.backgroundColor  , height:'89vh', display:"grid" , boxSizing:"border-box", overflowY:"auto"}}  className='overflow'>
    <Header>
  <TextWithDownload>
        <div>
        <P style={{color:theme.textColor}}>Inventory</P>
        <S style={{color:theme.textColor}}>List of medicines available for sales.</S>
        </div>
      
     {user.role === 'mainAdmin' && (<Button  onClick={()=>handleClickd(6)} style={{width:"200px" , height:"50px" ,color:"white", fontSize:"20px",borderRadius:"5px",marginTop:"auto" , marginBottom:"30px" , border:"none" , backgroundColor:"#1d242e"}}>+ Add</Button>)} 
        </TextWithDownload>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%"}} className='wrap'>
          < Cards 
          icon={<MedicineAvalable /> }
          value={num.toFixed(2)}
          title="Medicine available"
          navigationValue={7}
          handleClickd={handleClickd}
          navigationTitle='View Full List'
          />
            < Cards 
          icon={  <MedicineGroup /> }
          value={group}
          title="Medicine Groups"
          navigationValue={8}
          handleClickd={handleClickd}
          navigationTitle='View Groups'
          />
            < Cards 
          icon={ <Shortage /> }
          value={short}
          title="Medicine Shortage"
          navigationValue={24}
          handleClickd={handleClickd}
          navigationTitle='Resolve Now'
          />
     
           <Card4 style={{display:"hidden", background:"transparent" , border:"none"}}></Card4>
        </div>
    </Header>
    </div>)
}