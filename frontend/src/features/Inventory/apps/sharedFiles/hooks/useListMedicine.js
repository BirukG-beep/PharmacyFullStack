import { useState, useEffect, useCallback, useRef } from "react";
import { fetch } from "../services/api";

export const useListMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mounted = useRef(true);

  // Reset mounted on every mount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  

  // 🔥 Common request handler (exactly like useDashboard)
  const handleRequest = async (apiCall, setter) => {

    try {
      setLoading(true);
      setError(null);

      const response = await apiCall();

      if (mounted.current) {
        setter(response.data ?? []);
      }
    } catch (err) {
      console.error("🔥 API Error in useListMedicine:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load function (same style as loadSales / loadMedicine in dashboard)
  const loadMedicines = useCallback(() => {
    return handleRequest(fetch, setMedicines);
  }, []);

  // 🔥 Load everything at once (single call version - same pattern as loadAllDashboardData)
  const loadAllMedicineData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Full debug like in dashboard
      const medicineRes = await fetch();

      console.log("========== RAW API RESPONSE (useListMedicine) ==========");
      console.log("medicineRes:", medicineRes);
      console.log("========== ONLY .data ==========");
      console.log("medicines:", medicineRes?.data);

      if (mounted.current) {
        setMedicines(medicineRes?.data ?? []);
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
    loadAllMedicineData();
  }, [loadAllMedicineData]);

  return {
    medicines,
    loading,
    error,

    // actions (same as dashboard)
    loadMedicines,
    loadAllMedicineData,
  };
};