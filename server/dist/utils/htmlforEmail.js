export const verifyEmailHtml = (verificatoionCode) => {
    return `
  
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">
          <tr>
            <td align="center">
              <h1 style="color:#ff6b35;margin-bottom:10px;">
                🍽️ RestOra
              </h1>

              <h2 style="margin:0;color:#333;">
                Verify Your Email
              </h2>

              <p style="color:#666;font-size:16px;margin-top:20px;">
                Thank you for registering with RestOra.
              </p>

              <p style="color:#666;font-size:16px;">
                Use the verification code below to verify your account.
              </p>

              <div
                style="
                  margin:30px auto;
                  width:220px;
                  padding:18px;
                  background:#fff3ed;
                  border:2px dashed #ff6b35;
                  border-radius:8px;
                  font-size:34px;
                  font-weight:bold;
                  letter-spacing:10px;
                  color:#ff6b35;
                  text-align:center;
                "
              >
                ${verificatoionCode}
              </div>

              <p style="color:#888;">
                This verification code is valid for
                <strong>1 hour</strong>.
              </p>

              <p style="color:#888;">
                If you didn't create an account, you can safely ignore this email.
              </p>

              <hr style="margin:40px 0;border:none;border-top:1px solid #eee;" />

              <p style="font-size:13px;color:#999;">
                © ${new Date().getFullYear()} RestOra.
                All rights reserved.
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
export const ResetLinkMail = (resetUrl) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">

          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="background:#ffffff;padding:40px;border-radius:10px;"
          >

            <tr>
              <td align="center">

                <h1 style="color:#ff6b35;margin-bottom:10px;">
                  🍽️ RestOra
                </h1>

                <h2 style="color:#333;">
                  Reset Your Password
                </h2>

                <p style="color:#666;font-size:16px;">
                  We received a request to reset your password.
                </p>

                <p style="color:#666;font-size:16px;">
                  Click the button below to create a new password.
                </p>

                <a
                  href="${resetUrl}"
                  style="
                    display:inline-block;
                    margin-top:20px;
                    padding:14px 30px;
                    background:#ff6b35;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  Reset Password
                </a>

                <p style="margin-top:30px;color:#777;">
                  Or copy and paste this link into your browser:
                </p>

                <p style="word-break:break-all;color:#0066cc;">
                  ${resetUrl}
                </p>

                <p style="margin-top:30px;color:#888;">
                  This link will expire in <strong>1 hour</strong>.
                </p>

                <p style="color:#888;">
                  If you didn't request a password reset, you can safely ignore this email.
                </p>

                <hr style="margin:40px 0;border:none;border-top:1px solid #ddd;" />

                <p style="font-size:13px;color:#999;">
                  © ${new Date().getFullYear()} RestOra. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
export const ResetSuccessEmail = (fullName) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset Successful</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">

          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;padding:40px;border-radius:10px;">

            <tr>
              <td align="center">

                <h1 style="color:#22c55e;">
                  ✅ Password Updated Successfully
                </h1>

                <h2 style="color:#333;">
                  Hello ${fullName},
                </h2>

                <p style="font-size:16px;color:#666;">
                  Your RestOra account password has been changed successfully.
                </p>

                <p style="font-size:16px;color:#666;">
                  You can now log in using your new password.
                </p>

                <a
                  href="${process.env.FRONTEND_URL}/login"
                  style="
                    display:inline-block;
                    margin-top:25px;
                    padding:14px 30px;
                    background:#ff6b35;
                    color:#fff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                  "
                >
                  Login Now
                </a>

                <p style="margin-top:30px;color:#888;">
                  If you did not reset your password, please contact our support immediately.
                </p>

                <hr style="margin:40px 0;border:none;border-top:1px solid #ddd;" />

                <p style="font-size:13px;color:#999;">
                  © ${new Date().getFullYear()} RestOra. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
export const WelcomeEmailHtml = (fullName) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to RestOra</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">

          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:10px;padding:40px;">

            <tr>
              <td align="center">

                <h1 style="color:#ff6b35;">🍽️ Welcome to RestOra</h1>

                <h2 style="color:#333;">
                  Hello, ${fullName}! 👋
                </h2>

                <p style="font-size:16px;color:#666;">
                  Your account has been created successfully.
                </p>

                <p style="font-size:16px;color:#666;">
                  You can now explore restaurants, order delicious food,
                  track your orders, and enjoy a seamless food delivery experience.
                </p>

                <a
                  href="${process.env.FRONTEND_URL}"
                  style="
                    display:inline-block;
                    margin-top:25px;
                    padding:14px 30px;
                    background:#ff6b35;
                    color:#fff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                  "
                >
                  Explore RestOra
                </a>

                <hr style="margin:40px 0;border:none;border-top:1px solid #ddd;" />

                <p style="font-size:13px;color:#999;">
                  Thank you for joining the RestOra family ❤️
                </p>

                <p style="font-size:13px;color:#999;">
                  © ${new Date().getFullYear()} RestOra. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
