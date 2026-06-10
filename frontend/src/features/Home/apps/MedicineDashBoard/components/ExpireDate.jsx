import { Button , Card } from "antd";
import { useMedicine } from "../hooks/useMedicine";
import { useTheme } from "../../../../../hooks/useTheme";
const ExpireDate = ({ expiredMedicines  }) =>{
  const {deleteMedicine , Marker} = useMedicine();
  const theme = useTheme();
    return(
         <div style={{ padding: '20px', width: '100%', marginTop: '20px' }}>
        <h2  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",color:theme.textColor}}>Expired Medicines</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' , justifyContent:"center" }}>
          {expiredMedicines.length > 0 ? (
            expiredMedicines.map((med, index) => (
              <Card key={index} className="medicine-card" style={{border:"2px solid #ccc " , borderRadius:"5px"}}>
                <h3  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.medicineName}</h3>
                <p  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Quantity: {med.quantity}</p>
                <p  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Expire Date: {med.expireDate}</p>
                <p  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Description: {med.medicineDescription || 'No Description'}</p>
                <div style={{display:"flex" , justifyContent:"space-between" , paddingLeft:"10px", paddingRight:"10px"}}>
                <Button style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"red"}}   onClick={() => deleteMedicine(med._id)}>Delete</Button> 
                <Button style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333"}} onClick={() => Marker(med)}>Mark</Button>
                </div>
              </Card>
            ))
          ) : (
            <p>No expired medicines found.</p>
          )}
        </div>
      </div>
    )
}
export default ExpireDate;