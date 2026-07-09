import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();



export const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN!,
});

if (!process.env.MAILTRAP_API_TOKEN) {
  throw new Error("MAILTRAP_API_TOKEN is missing in .env");
}

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
