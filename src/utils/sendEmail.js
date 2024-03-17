import nodemailer from "nodemailer";
import apiError from "./apiError.js";
export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.messageHTML,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent succesfully to ", options.email);
  } catch (err) {
    // console.log(err)
    throw new apiError(500, "Error while sending email try again");
  }
};
