import { useState, useEffect } from "react";
import { deleteMedicine as deleteMedicineService, loadMedicine } from "./services";
import { Modal } from "antd";

export const useNotification = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await loadMedicine();
      setMedicines(result.data);

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDeleteMedicine = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this medicine?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteMedicineService(id);
          fetchMedicines(); // refresh
        } catch (err) {
          console.error("Error deleting medicine:", err);
          setError(err.message || "Delete failed");
        }
      },
    });
  };

  return {
    medicines,
    loading,
    error,
    deleteMedicine: handleDeleteMedicine,
  };
};