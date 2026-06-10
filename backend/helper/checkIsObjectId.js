const mongoose = require("mongoose");

// Export as named function
const isValidObjectId = (id) => {
  console.log("we are in validation")
  console.log(id)
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { isValidObjectId };