// import jwt from 'jsonwebtoken'

// export const generateTokens = (userId, role) => {
//   const accessToken = jwt.sign(
//     { id: userId, role, type: 'access' },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES || '15m' }
//   );

//   const refreshToken = jwt.sign(
//     { id: userId, type: 'refresh' },
//     process.env.JWT_REFRESH_SECRET,
//     { expiresIn: process.env.JWT_REFRESH_EXPIRES || '30d' }
//   );

//   return { accessToken, refreshToken }
// }; 

// utils/generateTokens.js
import jwt from 'jsonwebtoken'

export const generateTokens = (id, role) => {
  const accessToken = jwt.sign(
    { id, role, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { id, role, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  )

  return { accessToken, refreshToken }
}