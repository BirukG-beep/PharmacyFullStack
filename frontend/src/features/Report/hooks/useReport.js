import { useState, useEffect, useCallback, useRef } from "react";
import { responseTotalSale , fetchTotalSale } from "../services/Report";

export const useReport = () => {
  const [totalSale, setTotalSale] = useState(0);
  const [totalSalemount, setTotalSaleMount] = useState(0);
  const [error, setError] = useState(null);
  const [loading , setLoading] = useState(false);

  const mounted = useRef(true);

  // Reset mounted on every mount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);


  // 🔹 Load function (same style as loadSales / loadMedicine in dashboard)
  const loadTotalSale = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Full debug like in dashboard
      const totalSale = await responseTotalSale();

      if (mounted.current) {
        setTotalSale(totalSale.data.length);
      }
    } catch (err) {
      console.error("🔥 ERROR in loadAllMedicineData:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 Load everything at once (single call version - same pattern as loadAllDashboardData)
  const loadTotalSaleMount = useCallback(async () => {

    try {
      setLoading(true);
      setError(null);

      // Full debug like in dashboard
      const totalSaleResult = await fetchTotalSale();

      console.log("========== RAW API RESPONSE (useListMedicine) ==========");
      console.log("medicineRes:", totalSaleResult);
      console.log("========== ONLY .data ==========");
      console.log("medicines:", totalSaleResult?.data);
      const salesData = totalSaleResult?.data;
    const totalSales=  salesData.reduce((acc, item) => acc + item.totalSale, 0);

    console.log(totalSales)

      if (mounted.current) {
        setTotalSaleMount(totalSales.toFixed(2) || 0);
      }
    } catch (err) {
      console.error("🔥 ERROR in loadAllMedicineData:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 Auto load on mount (exactly like useDashboard)
  useEffect(() => {
    loadTotalSaleMount();
    loadTotalSale();
  }, [loadTotalSaleMount , loadTotalSale]);

  return {
    totalSale, 
    totalSalemount,
    loading,
    error,

    // actions (same as dashboard)
    loadTotalSale,
    loadTotalSaleMount,
  };
};