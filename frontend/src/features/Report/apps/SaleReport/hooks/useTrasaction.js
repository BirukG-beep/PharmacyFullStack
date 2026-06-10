import { useState, useEffect } from "react";
import { transaction } from "../services/transaction";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const result = await transaction(); // ✅ await
        console.log(result)
        setTransactions(result?.data || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // ✅ run once

  return { transactions, loading, error };
};