import {useTheme} from "../../../../../hooks/useTheme";
const TotalSale = ({totalSales}) =>{
    const theme = useTheme();
    return(  <div style={{ padding: '20px', backgroundColor: theme.backgroundColor , width: "full", display: "flex", gap:"10px" ,justifyContent: "center", height:"89vh" , overflowY:"auto" ,}}>
                 <div style={{backgroundColor:"#1d242e" , height:"fit-content" , padding:"10px" , borderRadius:"10px"}}>
                  <h2 style={{fontSize:"40px" , color:"#b7d7f0"}}>Total Sales</h2>
                  <h3 style={{fontSize:"40px" , textAlign:"center", color:"#b7d7f0"}} >{totalSales.toFixed(2)} ETB</h3>
                  </div>
                </div>)
}

export default TotalSale;