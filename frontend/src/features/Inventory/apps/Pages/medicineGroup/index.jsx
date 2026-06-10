import MadicineGroupName from './components/MadicineGroupName';
import { Header, TextWithDownload, P, S } from '../../../../../components/HomePage/ChildComponent/HomeDashboard';
import {useTheme} from "../../../../../hooks/useTheme"
const MedicineGroup = () => {
 const theme = useTheme();
  
  return (
    <div style={{ backgroundColor:theme.backgroundColor, height:"89vh" , boxSizing:"border-box", display: "grid" }} className='height'>
      <Header>
        <TextWithDownload>
          <div>
            <P style={{color:theme.textColor}}>Inventory List of Medicines (290)</P>
            <S style={{color:theme.textColor}}>List of medicines available for sales.</S>
          </div>
        </TextWithDownload>
        <MadicineGroupName />
      </Header>
    </div>
  );
};

export default MedicineGroup;
