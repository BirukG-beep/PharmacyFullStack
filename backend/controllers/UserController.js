const User = require('../model/scehemLogin'); // Make sure the file name is correct

module.exports.UserCount = async (req, res) => {
  try {
    // Await the result of countDocuments to get the number of users
    const userCount = await User.countDocuments();

    // Send the count as a response
    res.status(200).json({ userCount });  // You might want to return status 200 for a successful request
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user count' });
  }
};
