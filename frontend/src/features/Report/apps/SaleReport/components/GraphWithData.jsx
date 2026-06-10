// GraphWithData.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import OrderList from './OrderList';
import { useTransaction } from '../hooks/useTrasaction';
import { glowPlugin } from './GlowPlugin';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GraphWithData = () => {
  const { transactions, loading, error } = useTransaction();

  // === PROFESSIONAL DATA PREPARATION (Daily Sum + Unique Dates) ===
  const prepareChartData = () => {
    if (!transactions?.length) {
      return { labels: [], datasets: [] };
    }

    const dailySales = {};
    transactions.forEach((t) => {
      const dateKey = new Date(t.date).toISOString().split('T')[0]; // YYYY-MM-DD
      dailySales[dateKey] = (dailySales[dateKey] || 0) + t.quantity;
    });

    // Sort dates
    const sortedDates = Object.keys(dailySales).sort();

    return {
      labels: sortedDates.map((date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Daily Sales',
          data: sortedDates.map((date) => dailySales[date]),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.15)',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#f1f5f9',
          pointBorderColor: '#22c55e',
        },
      ],
    };
  };

  const chartData = prepareChartData();

  if (loading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: '#64748b',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '18px',
        }}
      >
        Loading sales chart...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: '#ef4444',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        Error loading transactions: {error}
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#f1f5f9',
          font: { size: 14, weight: 600, family: '"DM Sans", sans-serif' },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1e2937',
        titleColor: '#f1f5f9',
        bodyColor: '#22c55e',
        displayColors: false,
        callbacks: {
          label: (ctx) => `$${ctx.raw.toFixed(2)}`,
        },
      },
      glowPlugin, // Your beautiful glow effect
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.12)',
          lineWidth: 1,
        },
        border: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 12, family: '"DM Sans", sans-serif' },
          maxTicksLimit: 12,           // Prevents overcrowding
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.12)',
          lineWidth: 1,
        },
        border: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 13, family: '"DM Sans", sans-serif' },
          callback: (value) => '$' + value,
        },
      },
    },
    elements: {
      line: { borderWidth: 3 },
    },
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: '24px',
        padding: '24px',
        boxSizing: 'border-box',
        height: '38vh',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgb(15 23 42 / 0.25)',
        border: '1px solid rgba(148, 163, 184, 0.15)',
      }}
      className="split"
    >
      {/* Chart Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1d242e',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <Line data={chartData} options={options} />
      </div>

      {/* Order List (kept as-is) */}
      <OrderList />
    </div>
  );
};

export default GraphWithData;