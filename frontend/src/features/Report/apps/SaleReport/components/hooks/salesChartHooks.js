//these for graphWithData
import { useEffect , useState } from "react";


export const useSalesChart = (transactions) =>{
    console.log(transactions)
   const [chartData, setChartData] = useState({
    labels:[],
    datasets:[],
   })

   useEffect(()=>{
    if(!transactions || transactions.length === 0) return;
    
    const labels = transactions.map(t => 
        new Date(t.date).toLocaleDateString()
    );
     const salesData = transactions.map(t => t.quantity);
     setChartData({
        labels,
        datasets:[
            {
            label: "Sales",
            data:salesData,
            borderColor:"#007bff",
            backgroundColor:"rgba(0, 123, 255, 0.2)",
            tension:0.4
            },
        ],
     });
   }, [transactions]);
   return chartData;
} 