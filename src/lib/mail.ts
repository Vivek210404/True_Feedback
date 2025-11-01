import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // You can use others too
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});
