import * as api from "../services/cosmoService";
import { useState , useEffect } from "react";
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [analysis, setAnalysis] = useState([]);

  const fetchTransactions = async () => {
    const res = await api.getSales();
    setTransactions(res.data);
  };

  const handleResetTransactions = async () => {
    await api.resetSales();
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    analysis,
    fetchTransactions,
    handleResetTransactions,
  };
};