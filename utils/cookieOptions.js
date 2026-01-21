// utils/cookieOptions.js
export const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production'

  return {
    httpOnly: true,
    secure: isProd,                 // HTTPS required in prod
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    ...(isProd && process.env.COOKIE_DOMAIN
      ? { domain: process.env.COOKIE_DOMAIN }
      : {}),
  }
}