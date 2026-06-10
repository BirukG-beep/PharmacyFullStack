// hooks/fetchTransaction.js
import { useState, useEffect } from "react";
import { loadTransaction } from "../services";

export const useFetchTransaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await loadTransaction();
        setTransaction(result.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { transactions, loading, error };
};