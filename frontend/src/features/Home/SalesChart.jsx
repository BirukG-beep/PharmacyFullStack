import React, { useEffect, useState } from 'react';
import API from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [todaySales, setTodaySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter sales with non-zero todaySales
  const filterTodaySales = (salesData) => {
    const filtered = salesData.filter(sale => sale.todaySales > 0);
    setTodaySales(filtered);
  };

  const fetchAllSalesData = async () => {
    setLoading(true);
    try {
      const response = await API.get('/Sales/sales');
      setData(response.data);
      filterTodaySales(response.data);
    } catch (err) {
      setError('Failed to fetch sales data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSalesData();
  }, []);

  if (loading) return <div>Loading sales data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', textAlign: 'center' , height:"89vh" , overflowY:"auto" , padding:"20px" }}>
      <h2>Sales Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pharmacist" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSales" fill="#8884d8" name="Total Sold Quantity" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Today's Sales by Pharmacists:</h3>
        {todaySales.length > 0 ? (
          <ul>
            {todaySales.map((sale, index) => (
              <li key={index} style={{ listStyle: 'none' , width:"300px" , margin:"10px auto"}}>
                <div
                  style={{
                    padding: '20px',
                    background: '#ccc',
                    borderRadius: '5px',
                    textAlign: 'left',
                  }}
                >
                  <span>Pharmacist : &nbsp;</span>
                  <span style={{ fontWeight: 'bold' }}>{sale.pharmacist}</span>
                  <br />
                  {sale.todaySales} sold
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sales today.</p>
        )}
      </div>
    </div>
  );
};

export default SalesChart;