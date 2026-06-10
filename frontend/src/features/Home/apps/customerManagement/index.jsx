import React, { useState } from 'react';
import AddCustomer from './component/AddCustomer';
import TableCustomer from './component/TableCustomer';

import { useCustomer } from './hooks/customer';
import { useTheme } from '../../../../hooks/useTheme';
const CustomerPage = () => {
  const [form , setForm] = useState(false)
  const theme = useTheme();
 
  
    const { customer, addCustomer, deleteCustomer } = useCustomer();
  return (
    <div style={{ padding: '20px', backgroundColor: theme.backgroundColor }} className='customerPage'>
      <h1 style={{ color: theme.textColor }}>Supplier Management</h1>
       <TableCustomer   customer={customer}       // Hook state
        deleteCustomer={deleteCustomer} />
        <button onClick={()=>setForm(true)}>+</button>
       {form && <AddCustomer setForm={setForm} customer={customer} addCustomer={addCustomer}/>}
    </div>
  );
};

export default CustomerPage;
