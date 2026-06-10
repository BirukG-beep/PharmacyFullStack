  
  
  import Barcode from 'react-barcode';
  import { useTheme } from '../../../../../hooks/useTheme';
  import { useSelector } from 'react-redux';
  import { notification } from 'antd';
  import { useDispatch } from 'react-redux';
  import { updateQuantity } from '../../../../../Reducer/MedicineSlice';
  import { useState , useEffect } from 'react';
  import {  Button, Card, Form, Input, Select  } from 'antd';
  import {updateMedicine , postTransaction} from "../services";
  import { RenderSoldInSelect } from './renderSoldInSelect';
  import { handleSoldInChange } from '../helper/handleSoldInChange';
  import {calculateDisplayedQuantity} from "../helper/calculateDisplayedQuantity"
  const medicineDetail = ({  setCartItem ,setHistory , setCountCart , user }) =>{
    console.log(user)
 const medicine = useSelector((state) => state.medicine.selectedMedicine);
     const [soldQuantity, setSoldQuantity] = useState(0);
     const [Method , setMethod] = useState("Cash");
       const TAX_RATE = 0.02; // 2%
      const [price, setPrice] = useState(medicine?.price || 0);
      const [soldInOption, setSoldInOption] = useState(medicine?.soldIn || 'pk');

    const dispatch = useDispatch();
    const theme = useTheme();

     
  useEffect(() => {
    if (medicine) {
      setPrice(medicine.price * (1 + TAX_RATE)); // Apply tax on initial load
    }
  }, [medicine]);

        
      const users = useSelector((state) => state.user);
        const handleMethod = (value) => {
            setMethod(value);
          };
        
         const handleSold = async () => {
          console.log("user" , user)

     const priceCalculate =    handleSoldInChange(soldInOption , soldQuantity , medicine , TAX_RATE )
     console.log(priceCalculate)
             if (soldQuantity > 0) {
               let newQuantity;
         
               if (soldInOption === 'pk') {
                 newQuantity = medicine.quantity - soldQuantity;
               } else if (soldInOption === 'strip') {
                 newQuantity = medicine.quantity - soldQuantity / medicine.stripPerPk;
               } else if (soldInOption === 'tablet') {
                 newQuantity = medicine.quantity - soldQuantity / (medicine.stripPerPk * medicine.tabletsPerStrip);
               }
         
               if (newQuantity < 0) {
                 alert('Invalid quantity');
                 return;
               }
         
               try {
                 updateMedicine(newQuantity , medicine.medicineId)
         
                 const totalAmount = soldQuantity * price; // Total amount with tax included
                 console.log(price)
                 const transaction = {
                   ...medicine,
                   quantity:soldQuantity,
                   totalAmount,
                   price:handleSoldInChange(soldInOption , soldQuantity , medicine , TAX_RATE ),
                   date: new Date().toISOString(),
                   Method,
                   saler: users.username,
                   to:user
                 };
                 setCartItem(prev => [
                   ...prev, // Spread the existing items
                   { id:medicine.medicineId,name:medicine.medicineName, quantity: medicine.quantity , soldIn:medicine.soldIn , price:medicine.price , method:medicine.method , tax:TAX_RATE, totalPrice: price * TAX_RATE + price } // Append the new medicine
                 ]);

                 console.log(transaction)
               await postTransaction(transaction)
              
                 setHistory((prevHistory) => [transaction, ...prevHistory]);
                 dispatch(updateQuantity({ medicineId: medicine.medicineId, newQuantity }));
                 setSoldQuantity(0);
                   setCountCart(prev => prev+1)
               } catch (error) {
                 console.error('Error updating medicine or posting transaction:', error);
                  notification.error({
                             message: 'Error processing transaction',
                             description: 'Error not completed',
                           });
               }
             } else {
                notification.error({
                             message: 'Invalid quantity',
                             description: 'quantity you Entered is greater than store',
                           });
             }
           };

    return(
  <div style={{ padding: '20px', backgroundColor: theme.backgroundColor }}>
              <h2 style={{ textAlign: "center" }}>Medicine Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <Card style={{ backgroundColor: "aliceblue" }}>
                    <p><strong>Medicine ID:</strong> {medicine.medicineId}</p>
                    <p><strong>Name:</strong> {medicine.medicineName}</p>
                    <p><strong>Quantity:</strong> {calculateDisplayedQuantity(soldInOption , medicine)}</p>
                    <p><strong>Price:</strong> {handleSoldInChange(soldInOption , soldQuantity , medicine , TAX_RATE)} <span style={{color:"white" ,  borderRadius:"3px", padding:"2px" ,backgroundColor:"green"}}>with Tax</span></p>
                  </Card>
                  <Form layout='vertical' style={{ backgroundColor: "aliceblue", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                    <Form.Item label={<strong>Sold In:</strong>} style={{ marginBottom: "16px" }}>
                      {<RenderSoldInSelect soldInOption = {soldInOption} setSoldInOption={setSoldInOption}  medicine={medicine} />}
                    </Form.Item>
                    <Form.Item label={<strong>Quantity Sold:</strong>} style={{ marginBottom: "16px" }}>
                      <Input
                        type="number"
                        value={soldQuantity}
                        onChange={(e) => setSoldQuantity(Number(e.target.value))}
                        min="0"
                      />
                    </Form.Item>
                    <Form.Item label={<strong>Method:</strong>} style={{ marginBottom: "16px" }}>
                      <Select value={Method} onChange={handleMethod}>
                        <Option value="Credit Card">Credit Card</Option>
                        <Option value="Cash">Cash</Option>
                        <Option value="Mobile Banking">Mobile Banking</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                      <Button type="primary" onClick={handleSold}>Mark as Sold</Button>
                    </Form.Item>
                  </Form>
                </div>
                <div style={{ display: "grid", placeContent: "center", backgroundColor: "aliceblue" }}>
                  <Barcode value={medicine.medicineId} />
                </div>
              </div>
            </div>
    )
}
export default medicineDetail;