export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  const prod = process.env.FRONTEND_URL_ONE === "https://clever-figolla-5c9f25.netlify.app";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: prod ? "None" : "Lax",   // Important for cross-site cookies
      secure: prod,                      // Must be true for sameSite: "None"
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
