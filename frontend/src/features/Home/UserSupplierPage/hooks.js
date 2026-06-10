import { useState  , useRef , useCallback , useEffect} from "react";
import {supplierCount , countCustomer} from "./services"
export const useCustomerAndSupplier = () => {
      const [loading , setLoading] = useState(false)
      const [error , setError] = useState('')
      const [customers , setCustomers] = useState([])
      const [suppliers , setSuppliers] = useState([])
      
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
        supplierCountstate,
        countCustomerstate,
      ] = await Promise.all([
       supplierCount(),
        countCustomer(),
      ]);

        if (mounted.current) {
        setSuppliers(supplierCountstate?.data || 0);
        setCustomers(countCustomerstate?.data);
      }
    }
     catch (err) {
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

  return {customers , suppliers , loading , error};
}