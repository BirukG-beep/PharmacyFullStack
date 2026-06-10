const Cosmo = require("../../model/Cosmo");
const Item = require("../../model/Cosmo");
const { isValidObjectId } = require("../../helper/checkIsObjectId");
const TotalSale = require("../../model/SchemaTotalSale");
const SalesCosmo = require("../../model/SalesCosmo")
module.exports.CosmosalesTransaction = async (req, res) => {
  console.log("we are here for cosmo")
  try {
    // const {name , price , quantity} = req.body;
    console.log(req.body)
    if (!Array.isArray(req.body)) {
        const { quantity, _id } = req.body;
         const { isValidObjectId } = require('mongoose');

         if (!isValidObjectId(_id)) {
  console.log('Invalid ID format');
}
const cosmo = await Cosmo.findById(_id);

console.log(cosmo)
 if (cosmo.quantity < quantity) {
  console.log("you kidden me")
            return res.status(400).json(`Insufficient quantity for ${cosmo.name}. Available: ${cosmo.quantity}, Requested: ${quantity}`);
          }
 if (!cosmo) {
   return res.status(400).json({ error: 'Cosmo Not Found' });
          }
        
           const   totalPrice = cosmo.price * quantity;
                cosmo.quantity -= quantity;
             cosmo.save();
             console.log(totalPrice)

             console.log("we have reached these")

        const totalSale = new TotalSale({
              totalSale: totalPrice, // Match your schema field name
              sentDate: req.body.date || new Date() // Default to now if no date provided
            });

            await totalSale.save();

          const transaction = new SalesCosmo({
            name: cosmo.name,
            price: cosmo.price,
            quantity,
            pharamacist: req.body.pharmacist,
            _id:cosmo._id
          });
          await transaction.save(); 

       return    res.status(200).json({message:"sold"})
    }
    
//     let price = [];
//     let totalPrice = 0;
//     let finalPrice = 0;
//        const updatePromises = cosmoToOrder.map(async (orderedCosmo) => {
//           const { quantity, _id } = orderedCosmo;
          
//           // Find medicine
//          const { isValidObjectId } = require('mongoose'); // Or your custom validator

// if (!isValidObjectId(_id)) {
//   console.log('Invalid ID format');
// }
// const cosmo = await Cosmo.findById(_id);
//           if (!cosmo) {
//             console.log(`Medicine with ID ${_id} not found`);
//           }
          
//           // Check stock
//           if (cosmo.quantity < quantity) {
//             throw new Error(`Insufficient quantity for ${cosmo.name}. Available: ${cosmo.quantity}, Requested: ${quantity}`);
//           }

//           totalPrice = cosmo.totalPrice * quantity;
//           price.push(totalPrice) 
    
//           // Update quantity
//           cosmo.quantity -= quantity;
//           return cosmo.save();
//         });
//             // Wait for all medicine updates to complete
//         const updateCosmotics = await Promise.all(updatePromises);
//          finalPrice = price.reduce((sum, p) => sum + p, 0);
//             console.log("Final total price:", finalPrice);
        
//             // Save total sale record
//             const totalSale = new TotalSale({
//               totalSale: finalPrice, // Match your schema field name
//               sentDate: req.body.date || new Date() // Default to now if no date provided
//             });
            
//             await totalSale.save();
//     res.status(200).send({ message: "Transaction recorded", updateCosmotics:updateCosmotics });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

module.exports.IndCosmo = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.CosmoTransactionDelete = async (req, res) => {
  try {
    const result = await SalesCosmo.deleteMany({});
    res.status(200).json({ message: `Deleted ${result.deletedCount} documents` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.CosmoTransactionAdd = async (req, res) => {
  console.log(req.body)
  try {
  const {cartsItem, pharamacist} = req.body;
    const updatePromises = cartsItem.map(async (item) => {
      const { name, quantity, price } = item;
      const salesTransaction = new SalesCosmo({name , quantity , price , pharamacist})
      return salesTransaction.save();
    });
      await Promise.all(updatePromises);
  
    res.status(200).json({ message: `add the transaction document documents` });
  } catch (error) {

      console.log(error)
    res.status(500).json({ message: error.message });
  
  }
};

module.exports.CosmoDelete = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.EditCosmo = async (req, res) => {
  console.log(req.params.id)
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.Cosmos = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.PostCosmo = async (req, res) => {
  console.log(req.body)
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

module.exports.GetSell = async (req, res) => {
  try {
    const response = await SalesCosmo.find();
    res.json(response);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
