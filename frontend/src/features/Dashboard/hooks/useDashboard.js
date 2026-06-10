import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetch,
  countMedicine,
  Medicines,
  HighSold,
  supplierCount,
  UserCount,
  countCustomer,
} from "../services";

export const useDashboard = () => {
  const [medicine, setMedicine] = useState([]);
  const [sale, setSale] = useState([]);
  const [countMedicines, setCountMedicines] = useState(0);
  const [highSold, setHighSold] = useState({});
  const [supplierCountState, setSupplierCount] = useState(0);
  const [userCountState, setUserCount] = useState(0);
  const [customercount, setCustomer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const loadAllDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        salesRes,
        medicineRes,
        highSoldRes,
        supplierRes,
        userRes,
        countRes,
        customerRes,
      ] = await Promise.all([
        fetch(),
        Medicines(),
        HighSold(),
        supplierCount(),
        UserCount(),
        countMedicine(),
        countCustomer(),
      ]);

      if (mounted.current) {
        setSale(salesRes?.data || []);
        setMedicine(medicineRes?.data || []);
        setHighSold(highSoldRes?.data || {});
        setSupplierCount(supplierRes?.data?.length || 0);
        setUserCount(userRes?.data || 0);
        setCountMedicines(countRes?.data || 0);
        setCustomer(customerRes?.data?.length || 0);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err);
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadAllDashboardData();
  }, [loadAllDashboardData]);

  return {
    medicine,
    sale,
    countMedicines,
    highSold,
    supplierCountState,
    userCountState,
    customercount,
    loading,
    error,
    loadAllDashboardData,
  };
};