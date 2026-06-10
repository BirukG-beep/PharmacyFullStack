import { Bar } from 'react-chartjs-2';
import { Button } from 'antd';
import { useTheme } from '../../../../../hooks/useTheme';
const MedicineGraph = ({page,data  , handlePrevPage , handleNextPage , itemsPerPage , filteredMedicines}) =>{
const theme = useTheme();
    return (
         <div style={{ padding: '20px', height: '60vh' }} className='medicineDashboard'>
        <h2 style={{ fontFamily:' "DM Sans", sans-serif',textAlign:"center" , color:theme.textColor}}>Medicine Graph</h2>
        <div style={{ height: '100%' }} className='barcontainer'>
          <Bar
            data={data}
            options={{
              indexAxis: 'x', // Vertical bar chart (medicine names on x-axis)
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <div style={{display:"flex" , justifyContent:"space-between" , paddingLeft:"10px", paddingRight:"10px"}}>
                <Button onClick={handlePrevPage} disabled={page === 0} style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , textUnderlineOffset:"2px" , color:"Green" , backfaceVisibility:"visible", backgroundColor:"lightblue" , borderRadius:"10px"}}>Previous</Button> 
                <Button  onClick={handleNextPage} disabled={(page + 1) * itemsPerPage >= filteredMedicines.length} style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333" , backgroundColor:"lightblue" , borderRadius:"10px" , color:"Green" }}>Next</Button>
                </div>
          </div>
        </div>
      </div>
    )
}

export default MedicineGraph;