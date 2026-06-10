require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/db');
const admin = require("./routes/AdminRout.js")
const user = require("./routes/user.js");
const userCount = require('./routes/UserCount.js')
const client = require("./routes/ClientRout.js")
const contact = require("./routes/contactRout.js")
const cosmo = require("./routes/CosmoRout.js") 
const customer = require('./routes/customerRout.js')
const medicineGroup = require("./routes/medicineGroupRout.js")
const medicine = require('./routes/medicineRout.js')
const Sales = require('./routes/salesRout.js')
const Supplier = require('./routes/SupplierRout.js')
const transaction = require('./routes/transactionRout.js')
const corsMiddleware = require('./middleware/cors');
const refreshToken = require('./routes/AuthRout.js')
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT ;

app.use(corsMiddleware); 

app.use(express.json()); 

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/user', user);   
app.use('/api/Systemuser',userCount)
app.use('/api/client', client);    
app.use('/api/cosmo', cosmo);   
app.use('/api/customer', customer);     
app.use('/api/medicinesGroup', medicineGroup);   
app.use('/api/medicines', medicine);   
app.use('/api/Sales', Sales);   
app.use('/api/supplier', Supplier);   
app.use('/api/transactions', transaction);   
app.use('/api/auth' , refreshToken)
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1); 
  });