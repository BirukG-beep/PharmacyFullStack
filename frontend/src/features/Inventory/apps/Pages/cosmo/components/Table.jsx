import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Table } from "antd";
export const TableDisplayer = ({groupedData , columns , width , rowkey , datakey}) =>{
    console.log(columns)
    return ( 
     <div style={{display:"grid" , gridTemplateColumns:"2fr 1fr"}}>
         <BarChart width={width} height={300} data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={datakey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalQuantity" fill="#82ca9d" />
        <Bar dataKey="totalPrice" fill="#8884d8" />
      </BarChart>
    <Table
        dataSource={groupedData}
        columns={columns}
        rowKey={rowkey}
        pagination={true}
      />
  
      </div>)
}