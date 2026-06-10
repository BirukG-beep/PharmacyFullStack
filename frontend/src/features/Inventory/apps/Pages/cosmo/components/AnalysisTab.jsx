import React, { useState, useMemo } from "react";
import { DatePicker } from "antd";
import PieChart from "./PieChart";
import NavTab from "./NavTab";
import { processTransactionData } from "../utils/processTransactionData";
import { TableDisplayer } from "./Table";
import { getColumns } from "../utils/getColumns";
import { useTheme } from "../../../../../../hooks/useTheme";

const { RangePicker } = DatePicker;

const AnalysisTab = ({ data, width = 600 }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedTab, setSelectedTab] = useState("Pharmacist");
  const theme = useTheme();

  // Filter transactions by date range
  const filteredTransactions = useMemo(() => {
    if (!data || data.length === 0) return [];
    const [start, end] = dateRange;
    if (!start && !end) return data;

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    return data.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      if (startDate && txDate < startDate) return false;
      if (endDate && txDate > endDate) return false;
      return true;
    });
  }, [data, dateRange]);

  // Compute grouped data based on selectedTab
  const { groupedData, rowkey, datakey } = useMemo(() => {
    if (selectedTab === "Pharmacist") {
      const map = new Map();
      filteredTransactions.forEach((tx) => {
        const pharmacist = tx.pharamacist;
        if (!map.has(pharmacist)) {
          map.set(pharmacist, {
            pharamacist: pharmacist,
            totalQuantity: 0,
            totalPrice: 0,
          });
        }
        const entry = map.get(pharmacist);
        entry.totalQuantity += tx.quantity;
        entry.totalPrice += tx.price * tx.quantity;
      });
      return {
        groupedData: Array.from(map.values()),
        rowkey: "pharamacist",
        datakey: "pharamacist",
      };
    } else if (selectedTab === "Cosmotics") {
      const map = new Map();
      filteredTransactions.forEach((tx) => {
        const product = tx.name;
        if (!map.has(product)) {
          map.set(product, {
            name: product,
            totalQuantity: 0,
            totalPrice: 0,
          });
        }
        const entry = map.get(product);
        entry.totalQuantity += tx.quantity;
        entry.totalPrice += tx.price * tx.quantity;
      });
      return {
        groupedData: Array.from(map.values()),
        rowkey: "name",
        datakey: "name",
      };
    } else if (selectedTab === "User") {
      // If your transactions have a user field, group by user
      const map = new Map();
      filteredTransactions.forEach((tx) => {
        const user = tx.user; // adjust field name if needed
        if (!map.has(user)) {
          map.set(user, {
            name: user,
            totalQuantity: 0,
            totalPrice: 0,
          });
        }
        const entry = map.get(user);
        entry.totalQuantity += tx.quantity;
        entry.totalPrice += tx.price * tx.quantity;
      });
      return {
        groupedData: Array.from(map.values()),
        rowkey: "name",
        datakey: "name",
      };
    } else if (selectedTab === "WholeSaler") {
      // Group by wholesaler
      const map = new Map();
      filteredTransactions.forEach((tx) => {
        const wholesaler = tx.wholesaler; // adjust field name if needed
        if (!map.has(wholesaler)) {
          map.set(wholesaler, {
            name: wholesaler,
            totalQuantity: 0,
            totalPrice: 0,
          });
        }
        const entry = map.get(wholesaler);
        entry.totalQuantity += tx.quantity;
        entry.totalPrice += tx.price * tx.quantity;
      });
      return {
        groupedData: Array.from(map.values()),
        rowkey: "name",
        datakey: "name",
      };
    } else {
      return { groupedData: [], rowkey: "", datakey: "" };
    }
  }, [selectedTab, filteredTransactions]);

  // Pie chart data (using your existing processTransactionData)
  const { revenueByPharmacist, quantityByMedicine, quantityByPharmacist } = useMemo(() => {
    return processTransactionData(filteredTransactions);
  }, [filteredTransactions]);

  const columns = getColumns(selectedTab);

  return (
    <div style={{ height: "89vh", overflowY: "auto", scrollbarWidth: "none" }}>
      <NavTab activeTab={selectedTab} onTabChange={setSelectedTab} />

      <div
        style={{
          marginBottom: 16,
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3 style={{ marginRight: "10px", color: theme.textColor }}>Filter Date:</h3>
        <RangePicker
          showTime
          onChange={(dates) => setDateRange(dates || [null, null])}
          placeholder={["Start Date", "End Date"]}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {selectedTab === "Pharmacist" && <PieChart data={revenueByPharmacist} />}
        {selectedTab === "Cosmotics" && <PieChart data={quantityByMedicine} />}
        {selectedTab === "Pharmacist" && <PieChart data={quantityByPharmacist} />}
      </div>

      <TableDisplayer
        groupedData={groupedData}
        columns={columns}
        width={width}
        rowkey={rowkey}
        datakey={datakey}
      />
    </div>
  );
};

export default AnalysisTab;