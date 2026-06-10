import { useState, useEffect } from "react";
import { totalSaleCalculator } from "../utils/totalSaleCalculator";
import { statusMedicine } from "../utils/statusMedicine";
import { storageCalculator } from "../utils/storageCalculator";
import { groupExtractor } from "../utils/groupExtractor";

export const useDashboardLogic = (
  medicine,
  sale,
  countMedicines,
  highSold,
  supplierCountState,
  userCountState,
  customer
) => {
  const [date, setDate] = useState(new Date());
  const [final, setFinal] = useState(0);
  const [short, setShort] = useState(0);
  const [name, setName] = useState("");
  const [c, setC] = useState(0);
  const [supplier, setCountS] = useState(0);
  const [count, setCustomerCount] = useState(0);
  const [counts, setUsers] = useState(0);
  const [ce, setCe] = useState(0);
  const [good, setGood] = useState("");
  const [customercount, setCustomer] = useState(0);

  useEffect(() => {
    try {
      const totalSale = totalSaleCalculator(date, sale);
      setFinal(totalSale);
      setGood(statusMedicine(totalSale));

      setCe(countMedicines);
      setShort(storageCalculator(medicine));

      const { count } = groupExtractor(medicine);
      setC(count);

      setCountS(supplierCountState || 0);
      setUsers(userCountState || 0);
      setCustomerCount(userCountState || 0);
      setName(highSold?.medicineName || "");
      setCustomer(customer || 0);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }, [
    date,
    sale,
    medicine,
    countMedicines,
    supplierCountState,
    userCountState,
    highSold,
    customer
  ]);

  return {
    final,
    short,
    c,
    good,
    name,
    supplier,
    count,
    counts,
    ce,
    date,
    setDate,
    customercount
  };
};