import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaCalendarAlt,
  FaDollarSign,
} from 'react-icons/fa';

import { useTransaction } from '../hooks/useTrasaction';

const FilterControls = () => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const [totalSales, setTotalSales] = useState(0);
  const [averageSales, setAverageSales] = useState(0);
  const [salesTrend, setSalesTrend] = useState(null);

  const { transactions, loading, error } = useTransaction();

  const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    if (loading || error || !transactions?.length) {
      setTotalSales(0);
      setAverageSales(0);
      setSalesTrend(null);
      return;
    }

    const normalizedStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    const filtered = transactions.filter((t) => {
      console.log(t.date , startDate)
      const tDate = new Date(t.date);
      const normalizedTDate = new Date(
        tDate.getFullYear(),
        tDate.getMonth(),
        tDate.getDate()
      );
      return normalizedTDate >= normalizedStart;
    });


    console.log(filtered)
    if (!filtered.length) {
      setTotalSales(0);
      setAverageSales(0);
      setSalesTrend(null);
      return;
    }

    const sortedData = [...filtered].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const total = sortedData.reduce((sum, t) => sum + t.quantity, 0);
    const average = total / sortedData.length;

    setTotalSales(total);
    setAverageSales(average);

    const dailySales = {};
    sortedData.forEach((t) => {
      const key = new Date(t.date).toISOString().split('T')[0];
      dailySales[key] = (dailySales[key] || 0) + t.quantity;
    });

    const days = Object.keys(dailySales)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((d) => dailySales[d]);

    if (days.length < 2) {
      setSalesTrend('stable');
      return;
    }

    const mid = Math.floor(days.length / 2);
    const first = days.slice(0, mid).reduce((a, b) => a + b, 0);
    const second = days.slice(mid).reduce((a, b) => a + b, 0);

    const diff = second - first;

    if (first === 0 || Math.abs(diff) / first < 0.05) {
      setSalesTrend('stable');
    } else if (diff > 0) {
      setSalesTrend('up');
    } else {
      setSalesTrend('down');
    }
  }, [transactions, startDate, loading, error]);

  const trendConfig = {
    up: { color: '#22c55e', icon: <FaArrowUp />, text: 'Increasing' },
    down: { color: '#ef4444', icon: <FaArrowDown />, text: 'Decreasing' },
    stable: { color: '#eab308', icon: <FaEquals />, text: 'Stable' },
    null: { color: '#64748b', icon: null, text: 'No Data' },
  };

  const trend = trendConfig[salesTrend ?? 'null'];

  return (
    <div
      style={{
        width: '90%',
        margin: '30px auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
      }}
    >
      {/* DATE CARD */}
      <div style={cardStyle}>
        <div style={headerStyle}>
          <FaCalendarAlt />
          <span>Start Date</span>
        </div>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date || new Date())}
          customInput={
            <div style={dateInput}>
              {formatDate(startDate)}
            </div>
          }
        />
      </div>

      {/* TREND CARD */}
      <div style={cardStyle}>
        <div style={headerStyle}>
          <FaChartLine />
          <span>Sales Trend</span>
        </div>

        <div
          style={{
            ...trendBox,
            color: trend.color,
            borderColor: trend.color,
          }}
        >
          {trend.icon}
          <span>{trend.text}</span>
        </div>
      </div>

      {/* STATS CARD */}
      <div style={cardStyle}>
        <div style={headerStyle}>
          <FaDollarSign />
          <span>Statistics</span>
        </div>

        <div style={statRow}>
          <p>Total</p>
          <strong>${totalSales.toFixed(2)}</strong>
        </div>

        <div style={statRow}>
          <p>Average</p>
          <strong>${averageSales.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const cardStyle = {
  background: 'rgba(30,41,59,0)',
  backdropFilter: 'blur(12px)',
  borderRadius: '10px',
  padding: '20px',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#94a3b8',
  fontWeight: 600,
  marginBottom: '15px',
};

const dateInput = {
  padding: '12px',
  borderRadius: '12px',
  background: '#0f172a',
  color: '#f1f5f9',
  textAlign: 'center',
  cursor: 'pointer',
};

const trendBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '20px',
  borderRadius: '12px',
  border: '2px solid',
  fontSize: '18px',
  fontWeight: 700,
};

const statRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  color: '#e2e8f0',
};

export default FilterControls;