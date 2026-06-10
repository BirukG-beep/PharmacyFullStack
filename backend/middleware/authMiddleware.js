const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  //console.log('=== Auth Middleware ===');
  //console.log('Server Time:', new Date().toISOString());
  //console.log('Request URL:', req.originalUrl);
  //console.log('Headers:', JSON.stringify(req.headers, null, 2));
  //console.log('Header Keys:', Object.keys(req.headers));

  const authHeader = req.header('Authorization') || 
                    req.headers['authorization'] || 
                    req.headers['Authorization'];
  //console.log('Raw Authorization Header:', authHeader);

  if (!authHeader) {
    console.error('No authorization header found');
    return res.status(401).json({ 
      error: 'Missing authorization header', 
      receivedHeaders: Object.keys(req.headers) 
    });
  }
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.error('Malformed authorization header:', authHeader);
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  const token = tokenParts[1];
  //console.log('Extracted Token:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //console.log('JWT_SECRET:', process.env.JWT_SECRET);
    if (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(403).json({ 
        error: 'Invalid token', 
        details: err.message 
      });
    }
    //console.log('Decoded User:', user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;