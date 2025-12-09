const nodemailer = require("nodemailer");
const env = require("../example_env");

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465, 
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
});

async function sendEmail({ to, subject, text, html }) {
    await transporter.sendMail({
        from: env.SMTP_FROM,
        to, 
        subject, 
        text, 
        html,
    });
}

async function sendOtpEmail(to, code, purpose) {
    const title = purpose === "verify" ? "Verify your email" : "Your login code";
    const text = `Your ${purpose} code is ${code}. It will expire soon. Do not share it with anyone.`;
    const html = `
      <div style="font-family:Arial,sans-serif">
        <h2>${title}</h2>
        <p>Your one-time code is:</p>
        <p style="font-size:32px;letter-spacing:4px;"><strong>${code}</strong></p>
        <p>This code expires shortly. If you didn’t request this, ignore this email.</p>
      </div>
    `;
    await sendEmail({ to, subject: title, text, html });
  }
  
 module.exports = { sendEmail, sendOtpEmail };