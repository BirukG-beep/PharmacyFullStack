import React from "react";
import { Tabs, Input, Button } from "antd";
import {useState} from "react";
import {useSelector} from "react-redux"

import ItemsTab from "./components/ItemsTab";
import SalesTab from "./components/SalesTab";
import TransactionsTab from "./components/TransactionsTab";
import AnalysisTab from "./components/AnalysisTab";
import CartTab from "./components/CartTab";
import CosmoForm from "./components/CosmoForm";

import { useCosmoData } from "./hooks/useCosmoData";
import { useTransactions } from "./hooks/useTransactions";
import { useSales } from "./hooks/useSales";
import { useCart } from "./hooks/useCart";
import {useTheme} from "../../../../../hooks/useTheme"

const Cosmo = () => {
  // Fetch items
  const { data, fetchItems } = useCosmoData();

  const [cosmo , setCosmo] = useState(false);
  
  const theme = useTheme();

  const user = useSelector((state) => state.user);

  // Transactions & Analysis
  const { transactions, analysis, handleResetTransactions } = useTransactions();

  // Cart hook
  const { cartItems, countCart, addToCart, downloadReceipt } = useCart();

  // Sales hook connected to cart
  const { handleSale } = useSales(
  user,
  fetchItems,
  addToCart
);

  const width = 600; // for Analysis chart

  return (
    <div style={{paddingLeft:"40px" , paddingRight:"40px" , paddingTop:"5px" , height:"89vh", overflowY:"auto"}}>
       <h1 style={{ marginTop: "0", color: theme.textColor }}>
              Cosmotics
            </h1>
    <Tabs destroyInactiveTabPane={false}>
      {/* Items */}
      <Tabs.TabPane tab="Items" key="1">
        <ItemsTab data={data} />
      </Tabs.TabPane>

      {/* Sales */}
      <Tabs.TabPane tab="Sales" key="2">
        <SalesTab data={data} onSale={handleSale} />
      </Tabs.TabPane>

      {/* Transactions */}
      <Tabs.TabPane tab="Transactions" key="3">
        <TransactionsTab data={transactions} onReset={handleResetTransactions} />
      </Tabs.TabPane>

      {/* Analysis */}
      <Tabs.TabPane tab="Analysis" key="4">
        <AnalysisTab data={transactions} width={width} />
      </Tabs.TabPane>

      {/* Cart */}
      <Tabs.TabPane tab={`Cart (${countCart})`} key="5">
        <CartTab cartItems={cartItems} onDownload={downloadReceipt}  />
      </Tabs.TabPane>
    </Tabs>
  {cosmo && <CosmoForm setCosmo={setCosmo}/>}
    <Button onClick={() => setCosmo(!cosmo)}>{cosmo ? "Hide Cosmo" : "Show Cosmo"}</Button>
    </div>
  );
};

export default Cosmo;