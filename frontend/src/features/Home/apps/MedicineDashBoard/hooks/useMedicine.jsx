import { useState, useEffect } from "react";
import { loadMedicine, fetchMark, deleteMedicineApi, handleMark } from "../services";
import { Modal as AntdModal, notification } from "antd";

export const useMedicine = () => {
  const [medicine, setMedicine] = useState([]);
  const [mark, setMark] = useState([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const result = await loadMedicine();
        setMedicine(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedicine();
  }, []);

  useEffect(() => {
    const fetchMarkData = async () => {
      try {
        const result = await fetchMark();
        if (result.status === 200) {
          setMark(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarkData();
  }, []);

  const deleteMedicine = (id) => {
    AntdModal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this item?",
      onOk: async () => {
        try {
          await deleteMedicineApi(id);

          // update UI after delete
          setMedicine(prev => prev.filter(item => item._id !== id));

          notification.success({
            message: "Deletion Successful",
            description: "The item has been successfully deleted.",
          });
        } catch (error) {
          console.error("Error deleting medicine:", error);
          notification.error({
            message: "Deletion Failed",
            description: "There was an error deleting the item.",
          });
        }
      },
    });
  };


  const Marker = async (medicine) =>{
    console.log(medicine)
    try{
      await handleMark(medicine)
    }
    catch (error) {
      console.log(error)
    }
  }
  return { medicine, mark, deleteMedicine , Marker };
};