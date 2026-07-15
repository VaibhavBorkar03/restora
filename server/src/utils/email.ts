import { client, sender } from "../config/mailtrap.js";
import {
  ResetLinkMail,
  ResetSuccessEmail,
  verifyEmailHtml,
  WelcomeEmailHtml,
} from "./htmlforEmail.js";

//DISPLAY MESSAGE ON EMAIL
export const verificationEmail = async (
  email: string,
  verificationToken: string, //otp
) => {
  const recipient = [{ email }];
  const verifyEmailHtm = verifyEmailHtml(verificationToken);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: verifyEmailHtm,
      category: "Email verification",
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string,
) => {
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
    throw new Error("Internal server error");
  }
};

export const sendResetSuccessEmail = async (
  email: string,
  fullname: string,
) => {
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
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
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
    console.log(error);
    throw new Error("Internal server error");
  }
};
