
const encryptPassword = require('../../helper/encriptionPassword');
const validatePassword = require('../../helper/validatePassword')
const User = require('../../model/scehemLogin'); 
const path = require('path');
const fs = require('fs')
const jwt = require('jsonwebtoken');

module.exports.RegisterUser =  async (req, res) => {
  console.log(req.body)
  try {
    const { username, password , phone  } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await encryptPassword(password); 
 
    const user = new User({ username, password: hashedPassword, role: 'User' , phone  });

    await user.save();

    res.json({ message: 'User created successfully', user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

module.exports.loginUser = async (req, res) => {
  //console.log('user name is objected')
  console.log(req.body) // Log the request body to see what is being sent
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      console.log('Invalid username');
      return res.status(401).json({ message: 'Invalid username' });
    }

    // Validate the password
    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      console.log('Incorrect password');
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT tokens
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Set refresh token as a cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // Makes the cookie HTTP-only
      secure: false,  // Works in both development and production, set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "None",
    });

    // Define upload path
    const uploadPath = path.join(__dirname, 'uploads');
    const imageFormats = ['.jpg', '.jpeg', '.png', '.gif'];
    let foundImage = null;

    // Check if user's profile image exists
    for (const format of imageFormats) {
      const filePath = path.join(uploadPath, `${username}${format}`);
      if (fs.existsSync(filePath)) {
        foundImage = `${req.protocol}://${req.get('host')}/uploads/${username}${format}`;
        break;
      }
    }

    if (!foundImage) {
      foundImage = `${req.protocol}://${req.get('host')}/uploads/default.png`; // Default image URL
    }

    // Send success response with user details and access token in Authorization Bearer header
    res.json({
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        image: foundImage,
        _id: user._id,
      },
      access_token: token, // Include the access token in the response body
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

module.exports.GetUsers = async (req , res) =>{
  try{
     const user = await User.find();

     console.log(user)
     res.status(200).json(user)
  }
  catch(error){
    console.log(error)
  }
}
module.exports.DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;                    // better destructuring

    const result = await User.findOneAndDelete({ username: id });

    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: result   // or just { username: result.username } if you don't want full doc
    });

  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user"
    });
  }
};
module.exports.UpdateUser = async (req, res) => {
  try {
    const id = req.body.id;

    console.log(req.body);

    let updateData = { ...req.body }; // copy body

    // 🔥 If password exists → encrypt it
    if (updateData.password) {
      updateData.password = await encryptPassword(updateData.password);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};