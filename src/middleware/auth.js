import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';

export const auth = () => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Please sign in' });

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) return res.status(498).json({ message: 'Invalid Token', error });

      req.user = decoded;
      next();
    });
  };
};

export default auth;
