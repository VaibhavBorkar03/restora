import { client, sender } from "../config/mailtrap.js";
import {
  ResetLinkMail,
  ResetSuccessEmail,
  verifyEmailHtml,
  WelcomeEmailHtml,
} from "./htmlforEmail.js";
//DISPLAY MESSAGE ON EMAIL
export const verificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  const verificatoionCode = verifyEmailHtml(verificationToken);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: verificatoionCode,
      category: "Email verification",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: ResetLinkMail(resetUrl),
      category: "Reset Password",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const sendResetSuccessEmail = async (email, fullname) => {
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: ResetSuccessEmail(fullname),
      category: "Password reset",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const res = client.send({
      from: sender,
      to: recipient,
      subject: "welcome to restora",
      html: WelcomeEmailHtml(name),
      template_variables: {
        project_name: "RestOra",
        name: name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
