import { useState, useEffect } from "react";
import * as api from "../services/cosmoService";
import {createCosmo} from "../services/cosmoService"

export const useCosmoData = () => {
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    const res = await api.getCosmo();
    setData(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const postCosmo = async (itemData) => {
    await createCosmo(itemData);
    fetchItems(); // Refresh data after creation
  }
  return { data, setData, fetchItems, postCosmo };
};