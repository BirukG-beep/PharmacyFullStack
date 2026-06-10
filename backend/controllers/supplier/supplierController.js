
const UserSupplier = require('../../model/UserSchema')
const User = require('../../model/scehemLogin');
// const { body, validationResult } = require('express-validator');
module.exports.Supplier =  async (req, res) => {
    try {
        // Fetch all users
        const users = await UserSupplier.find();
  
        // Send users and supplier count as a response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  }

  module.exports.SupplierCount =  async (req, res) => {
    try {
      
        
        // Get the total count of suppliers
        const supplierCount = await User.countDocuments();


        // Send users and supplier count as a response
        res.status(200).json(supplierCount);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}
module.exports.UserSupplierPost =  async (req, res) => {
    console.log(req.body)
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
  
    const { name, email, phone, address } = req.body;
    console.log({ name, email, phone, address })

  
    try {
        const user = new UserSupplier({ name, email, phone, address });
        await user.save();
        console.log(user)
        res.status(201).json(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
  }


  module.exports.deleteSuplier = async (req , res) =>{
    console.log(req.params.id)
    try{
    const id = req.params.id;
    const result = await UserSupplier.findByIdAndDelete(id);
    console.log(result)
    }
    catch (error){
      console.log(error)
    }
  }
  module.exports.SupplierEdit = async (req, res) => {
    try {
      const { id } = req.params; // customer id
      const updateData = req.body; // new values: name, email, phone, etc.
  
      // Find the customer by ID and update with new values
      const updatedCustomer = await UserSupplier.findByIdAndUpdate(id, updateData, {
        new: true, // return the updated document
        runValidators: true, // ensure validation rules are applied
      });
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.status(200).json(updatedCustomer);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  };
  