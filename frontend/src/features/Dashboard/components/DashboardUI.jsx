import { DisplayCard } from "./displayCard";
import { StatusCard } from "./StatusCard";
import {Header , Body , TextWithDownload , P, S , Content , Logo , Span , Card2 ,Short2  , Body1 ,  HeaderBody , ContentBody , Pmain , Psmall} from '../../../components/HomePage/ChildComponent/HomeDashboard.js';
import RevenueCalendar from '../../../components/HomePage/ChildComponent/RevenueCalendar';
import EllipsisMenu from '../../../components/HomePage/ChildComponent/EllipsisMenu';
import { Health ,Revenue ,Shortage , Status  } from '../icons/DashBoardIcons.jsx';
import { useTheme } from "../../../hooks/useTheme";
export const DashboardUI = ({
  good,
  final,
  date,
  handleClickd,
  ce,
  short,
  c,
  supplier,
  counts,
  count,
  name,
setDate,
customer}) =>{
  const theme = useTheme();
return (
      <div style={{backgroundColor:theme.backgroundColor  , display:"grid" , height:"89vh" , boxSizing:"border-box"}} className='homepage'>
    <Header>
      <TextWithDownload>
        <div>
        <P style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor}}>Dashboard</P>
        <S style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor }}>Quick data over view of Invertory</S>
        </div>
      
     <EllipsisMenu></EllipsisMenu>
        </TextWithDownload>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%" , }} className='wrap' >
          <StatusCard
           handleClickd = {handleClickd}
           icon={<Health />}  
           content={`${good}`}
           title='Inventory status'
           detail='View Detailed Report'
           value={100}>
            </StatusCard>
                     
           <Card2>
           <Logo>
         <Revenue />
  </Logo>
  <div>
            <Content> {final} Birr</Content>
            <Span>Revenue : <RevenueCalendar setDates={setDate} date={date}></RevenueCalendar></Span>
            </div>
            <Short2 onClick={()=>handleClickd(10)}style={{fontFamily:' "DM Sans", sans-serif' }} >View Detailed Report<span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></Short2>
           </Card2>
                <StatusCard
           handleClickd = {handleClickd}
           icon={<Status />}  
           content={`${ce.toFixed(2)}`}
           title='Medicine available'
           detail='Visit Inventory'
           value={7}
           >
            </StatusCard>
             <StatusCard
           handleClickd = {handleClickd}
           icon={<Shortage />}  
           content={`${short}`}
           title='Medicine Shortage'
           detail='Resolve Now'
           value={24}
           >
            </StatusCard>
        </div>
    </Header>
    <Body style={{color:theme.textColor ,paddingLeft:"30px", paddingRight:"30px", display:"grid",gap:"25px" ,placeContent:"center", gridTemplateColumns:"1fr 1fr"}} className='over'>
     <DisplayCard 
     handleClickd={handleClickd}
     mainTitle='Inventory'
     textColor={theme.textColor}
     title='Go to Inventory'
     value={ce.toFixed(3)}
     secondValue='Total no of Medicines'
     thirdValue={c}
     fourthValue='Medicine Groups'
     navigatorValue={7}
     />
      <Body1>
<HeaderBody>
<div style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor }}>Quick Report</div>
<div style={{color:"#555" , fontSize:"15px"}}>  <span style={{ paddingLeft:"5px" , display:"flex" , alignItems:"center"}}><RevenueCalendar></RevenueCalendar></span></div>
</HeaderBody>
<ContentBody>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor }}>70,856</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif'  , color:theme.textColor}}>Total no of Medicines</Psmall>
  </div>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor }}>5,288</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif' , color:theme.textColor }}>Invoices Generated</Psmall>
  </div>
</ContentBody>
      </Body1>
       <DisplayCard 
     handleClickd={handleClickd}
     mainTitle='My Pharmacy'
     title='Go to User Management '
     value={supplier}
     secondValue='Total no of Suppliers'
     thirdValue={counts}
     fourthValue='Total no of Users'
     navigatorValue={22}
     />
       <DisplayCard 
     handleClickd={handleClickd}
     mainTitle='Customers'
     title='Go to Customers Page'
     value={customer}
     secondValue='Total no of Customers'
     thirdValue={name}
     fourthValue='Frequently bought Item'
     navigatorValue={20}
     />
    </Body>
    </div>
 )
}
export default DashboardUI;