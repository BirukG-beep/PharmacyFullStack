import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSort, FaChartLine, FaArrowDown, FaArrowUp , FaCaretLeft } from 'react-icons/fa';
import axios from 'axios';

import { useTransaction } from '../hooks/useTrasaction';
const FilterControls = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionsData, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [averageSales, setAverageSales] = useState(0);
  const [salesTrend, setSalesTrend] = useState(null); // New state for trend


    const { transactions, loading, error } = useTransaction();
   const sortedData = transaction.sort((a, b) => new Date(a.date) - new Date(b.date));

      


  // Format date to "Day Month Year" format
  const formatDate = (date) => {
    if (!date) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };


   setTransactions(sortedData);
        console.log(sortedData);
        calculateSales(sortedData);

  

  return (
    <>
      <div style={{ width: "70vw", display: "flex", justifyContent: "space-between", height: "10vh" }} className='splitwithmargin'>
        <div style={{ display: 'grid', marginRight: '20px', height: "fit-content", padding: "4px", borderRadius: "5px", fontSize: "30px", backgroundColor: "#1d242e" , display:"grid" , placeItems:"center" }} className='one'>
          <label htmlFor="startDate" style={{ marginRight: '10px', margin: "0", padding: "0", fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: "#e7ebf0" }}>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Start Date"
            dateFormat="dd MMMM yyyy"
            customInput={
              <input
                value={formatDate(startDate)}
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer', width:"100%" , background:"#e7ebf0" }}
              />
            }
          />
        </div>

        <div style={{ display: 'grid', marginRight: '20px', height: "fit-content", padding: "4px", borderRadius: "5px", fontSize: "30px", backgroundColor: "#1d242e" }} className='one'>
          <p style={{ marginRight: '10px', fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: "#e7ebf0", margin: "0" , fontSize:"20px" }}>
            <FaChartLine color='green' size={15} /> Sales Status
          </p>
          {salesTrend === 'down' && (
            <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", margin: "0", color: "black" }}>
              <FaArrowDown color='red' /> Downward Going
            </p>
          )}
          {salesTrend === 'up' && (
            <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", margin: "0", color: "black" }}>
              <FaArrowUp color='green' /> Up Going
            </p>
          )}
          {salesTrend === 'stable' && (
            <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", margin: "0", color: "black" }}>
              <span>🚦</span> Sales Stable
            </p>
          )}
        </div>

        <div style={{ display: 'grid', marginRight: '20px', height: "fit-content", padding: "4px", borderRadius: "5px", fontSize: "30px", backgroundColor: "#1d242e" }} className='one'>
          <p style={{ marginRight: '10px', fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: "#e7ebf0", margin: "0", fontSize:"20px" }}>
            <FaSort color='green' size={15} /> Total Sales: ${totalSales.toFixed(2)}
          </p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", background: "transparent", margin: "0", color: "black" , color:"#e7ebf0" }}>
            <FaCaretLeft color='gray' /> Average Sale: ${averageSales.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default FilterControls;