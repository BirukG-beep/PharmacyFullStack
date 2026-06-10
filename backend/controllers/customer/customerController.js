const Customer = require('../../model/Customer');

exports.createCustomer = async (req , res) =>{
  console.log("Creating customer with data:", req.body); // Debug log
  try{
     const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  }
  catch (err){
    res.status(500).json({message: err.message})
    console.log(err.message)
  }
}

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params; // customer id
    const updateData = req.body; // new values: name, email, phone, etc.

    // Find the customer by ID and update with new values
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
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
