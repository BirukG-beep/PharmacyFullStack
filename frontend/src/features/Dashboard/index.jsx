import { toggleClicked } from "../../Reducer/dashboardSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Meds } from "../../Reducer/medicine.js";
import DashboardUI from "./components/DashboardUI.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useDashboardLogic } from "./hooks/useDashboardLogic.js";
import { useDashboard } from "./hooks/useDashboard.js";

const Dashboard = () => {
  const { backgroundColor, textColor } = useTheme();
  const dispatch = useDispatch();

  const handleClickd = (value) => {
    dispatch(toggleClicked(value));
  };

  const {
    medicine,
    sale,
    countMedicines,
    highSold,
    supplierCountState,
    userCountState,
    customercount
  } = useDashboard();

  const {
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
    setDate
  } = useDashboardLogic(
    medicine,
    sale,
    countMedicines,
    highSold,
    supplierCountState,
    userCountState,
    customercount
  );

  useEffect(() => {
    dispatch(Meds({ num: medicine.length, group: c, short }));
  }, [medicine.length, c, short, dispatch]);

  return (
    <DashboardUI
      good={good}
      final={final}
      date={date}
      handleClickd={handleClickd}
      ce={ce}
      short={short}
      c={c}
      supplier={supplier}
      customer={customercount}
      counts={counts}
      count={count}
      name={name}
      setDate={setDate}
    />
  );
};

export default Dashboard;