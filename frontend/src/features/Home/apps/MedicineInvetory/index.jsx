import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../../../services/api';
import { useTheme } from '../../../../hooks/useTheme';

import { Tabs, Layout, Button, Card, Form, Input, Select, Table ,  Col, Row , Button as Buttom } from 'antd';
import { InfoCircleOutlined, HistoryOutlined, DollarOutlined } from '@ant-design/icons';
import { FaCartArrowDown } from 'react-icons/fa';
import MedicineDetail from "./components/MedicineDetail";
import TransactionHistory from './components/TransactionHistory';
import TotalSale from "./components/TotalSale";
import Reciept from './components/Reciept';
import { fetchContacts } from './services';
const { TabPane } = Tabs;
const { Content } = Layout;
const MedicineInventory = () => {
  const [countCart , setCountCart] = useState(0);
  const [history, setHistory] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [user , setUser] = useState(null);



  const [totalSales, setTotalSales] = useState(0);
  const [cartsItem , setCartItem] = useState([]);
  const medicine = useSelector((state) => state.medicine.selectedMedicine);
  const theme = useTheme();


    useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await fetchContacts(); 
        console.log("contacts")
        console.log(response.data)
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    getContacts();
  }, []);



  useEffect(() => {
    if (medicine) {
      const fetchHistory = async () => {
        try {
          const response = await API.get(`/transactions/transactions?medicineId=${medicine.medicineId}`);
          console.log("history")
          console.log(response.data)
          setHistory(response.data);
          const total = response.data.reduce((acc, item) => acc + item.price, 0);
          setTotalSales(total);
        } catch (error) {
          console.error('Error fetching transaction history:', error);
          alert('Error fetching transaction history');
        }
      };
      fetchHistory();
    }
  }, [medicine]);

  console.log(cartsItem)


  if (!medicine) {
    return <p>No medicine selected.</p>;
  }

  return (
    <Layout style={{ padding: '20px', backgroundColor: theme.backgroundColor, height:"89vh"  , boxSizing:"border-box"  , overflowY:"auto" }}>
      <Content style={{ fontFamily: '"DM Sans", sans-serif', color: theme.textColor }}>
        <h1 style={{ textAlign: "center" }}>Medicine Inventory</h1>
        {
          contacts.length > 0 ? (
            <select style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', borderColor: theme.borderColor, backgroundColor: theme.backgroundColor, color: theme.textColor }} onChange={(e) => setUser(e.target.value)}>
              <option value="">Select Contact</option>
              {contacts.map(contact => (
                <option key={contact.id} value={contact.phone}>
                  {contact.name} - {contact.phone}
                </option>
              ))}
            </select>
          ) : (
            <p>No contacts available.</p>
           )
        }
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><InfoCircleOutlined /> Medicine Details</span>} key="1">
          <MedicineDetail setCartItem ={setCartItem} setHistory = {setHistory}  setCountCart = {setCountCart} user={user}/>
          </TabPane>

          <TabPane tab={<span><HistoryOutlined /> Transaction History</span>} key="2">
           <TransactionHistory history={history}/>
          </TabPane>

          <TabPane tab={<span><DollarOutlined /> Total Sales</span>} key="3">
          <TotalSale totalSales={totalSales}/>
          </TabPane>
          <TabPane tab={ <div style={{display:"flex"}}><FaCartArrowDown size={15}></FaCartArrowDown> <span className='cartNumber'>{countCart}</span></div>} key="4">
          <Reciept cartsItem={cartsItem} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default MedicineInventory;
