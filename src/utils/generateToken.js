import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
  if(!id) return 

  const token = jwt.sign(id, process.env.REACT_APP_JWT_SECRET);
  
  return token;
}