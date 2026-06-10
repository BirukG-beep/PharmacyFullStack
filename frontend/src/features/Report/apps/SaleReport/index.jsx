import {Header1 , Body , TextWithDownload1 , P, S } from '../../../../components/HomePage/ChildComponent/HomeDashboard';

import EllipsisMenu from '../../../../components/HomePage/EllipsisMenu';
import FilterControls from './components/FilterControl'
import GraphWithData from './components/GraphWithData';
import { useSelector } from 'react-redux'; 
const SaleReport = () =>{
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
 return(
    <div style={{backgroundColor  , display:"grid", maxWidth:"calc(100vw - 250px)"  ,gridTemplateRows:"1fr 3fr" , overflowY:"auto" , height:"89vh" , boxSizing:"border-box"}} className='salesReportOne'>
    <div style={{padding:"25px"}}>
      <TextWithDownload1>
        <div>
        <P style={{color:textColor}}>Sale Report</P>
        <S style={{color:textColor}}>Quick data over view of Invertory</S>
        </div>
      
     <EllipsisMenu></EllipsisMenu>
        </TextWithDownload1>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%"}} className='hidden'>
          
        </div>
    </div>
    <Body style={{color:"#555" ,paddingLeft:"30px", paddingRight:"30px", display:"grid",gap:"25px" , gridTemplateColumns:"1fr"  , height:"10vh"}}>
    <FilterControls></FilterControls>
    <GraphWithData></GraphWithData>
    </Body>
    </div>
 )
}
export default SaleReport;