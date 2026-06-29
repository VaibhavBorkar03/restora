import { client, sender } from "../config/mailtrap.js";

//DISPLAY MESSAGE ON EMAIL
export const verificationEmail = async (
  email: string,
  verificationToken: string,
) => {
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: "",
      category: "Email verification",
    });
  } catch (error) {
    console.log(error);
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
      html: "",
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: "",
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
      html: "",
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
