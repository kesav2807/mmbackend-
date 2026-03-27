const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password' });
  }
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({ token, message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { adminLogin };
