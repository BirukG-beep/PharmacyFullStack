import { Button } from "antd";
import { useMedicine } from "../hooks/useMedicine";
import { useTheme } from "../../../../../hooks/useTheme";
const MedicineTable = ({ searchTerm , setSearchTerm ,quantitySearchTerm  ,descriptionSearchTerm,  setQuantitySearchTerm , setDescriptionSearchTerm , getCurrentPageData   }) =>{
  const {Marker} = useMedicine();
   const theme = useTheme();
  return (
   <div style={{ padding: '20px', height: '75vh', overflowY: 'auto',scrollbarWidth:"none"  }} >
        <h2 style={{ fontFamily:' "DM Sans", sans-serif',textAlign:"center" , color:theme.textColor}}>Medicine Table</h2>
        <div>
          <div>
            <label style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", marginRight:"10px"}}>Search by name:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{width:"150px" , height:"30px" , borderRadius:"5px", backgroundColor:"#eee" , fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"1px solid black" , margin:"7px"}}
        />
        </div>
        <div>
       <label style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", marginRight:"10px"}}>search by quantity:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="number"
          placeholder="Search by max quantity..."
          value={quantitySearchTerm}
          onChange={(e) => setQuantitySearchTerm(e.target.value)}
          style={{width:"150px" , height:"30px" , borderRadius:"5px", backgroundColor:"#eee" , fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"1px solid black" , margin:"7px"}}
        />
        </div>
        <div>
          <label style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", marginRight:"10px"}}>Search by description:</label>
        <input
          type="text"
          placeholder="Search by description..."
          value={descriptionSearchTerm}
          onChange={(e) => setDescriptionSearchTerm(e.target.value)}
          style={{width:"150px" , height:"30px" , borderRadius:"5px", backgroundColor:"#eee" , fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"1px solid black" , margin:"7px"}}
        />
        </div>
        </div>
        <div className='medicineTable' style={{scrollbarWidth:"none", marginTop: '20px', width: '30vw', overflowX: 'auto' }}>
        <table className="medicine-table" style={{scrollbarWidth:"none"}}>
          <thead>
            <tr>
              <th style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Name</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Quantity</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Expire Date</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Medicine Description</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((med, index) => (
              <tr key={index}>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.medicineName}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.quantity}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.expirationDate}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.medicineDescription}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>
                  <Button onClick={() => Marker(med)}  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333"}}>Mark</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    )
}
export default MedicineTable;