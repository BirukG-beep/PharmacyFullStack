import { useEffect, useState } from "react";
import { fetchMedicine, deleteMedicine } from "./services";

export const useMedicine = () => {
  const [medicine, setMedicine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load medicines
  useEffect(() => {
    const loadMedicine = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMedicine();
        setMedicine(result.data || []);
      } catch (error) {
        console.error("Failed to fetch medicine:", error);
        setError(error);
        setMedicine([]);
      } finally {
        setLoading(false);
      }
    };

    loadMedicine();
  }, []);

  // Function to delete a medicine
  const deleteMedicineFunc = async (id) => {
    try {
      await deleteMedicine(id);
      // Remove from local state after deletion
      setMedicine((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Failed to delete medicine:", err);
      setError(err);
    }
  };

  return { medicine, loading, error, deleteMedicineFunc };
};