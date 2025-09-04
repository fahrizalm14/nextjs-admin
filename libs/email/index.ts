import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true", // true = 465, false = 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  const info = await transporter.sendMail({
    from: `"Jagad Cloud" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
    text,
  });
  console.log("Email sent:", info.messageId);
  return info;
}

export async function sendVerificationEmail(userEmail: string, token: string) {
  const verificationUrl = `${process.env.PUBLIC_APP_URL}/api/verify-email?token=${token}`;
  await sendEmail({
    to: userEmail,
    subject: "Aktivasi Akun Anda - Jagad Cloud",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
        
        <!-- Logo -->
        <div style="text-align:center; margin-bottom: 20px;">
          <img src="https://ik.imagekit.io/mf1j3kikz/jagad-cloud-logo.png" alt="Jagad Cloud" style="height: 60px;" />
        </div>
  
        <h2 style="color:#d32f2f; text-align:center;">Selamat Datang di Jagad Cloud!</h2>
        <p>Halo,</p>
        <p>Terima kasih telah mendaftar. Untuk mengaktifkan akun Anda, silakan klik tombol di bawah ini:</p>
        
        <p style="text-align:center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color:#d32f2f; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; font-weight:bold;">
            Verifikasi Email
          </a>
        </p>
  
        <p>Link ini hanya berlaku selama <strong>24 jam</strong>. Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
  
        <hr style="margin: 20px 0;" />
        <p style="font-size: 12px; color: #777;">
          Jika Anda tidak merasa mendaftar, abaikan email ini.<br/>
          Email ini dikirim otomatis, mohon jangan membalas.
        </p>
      </div>
    `,
  });
}
export async function sendForgotPasswordEmail(
  userEmail: string,
  token: string
) {
  // Buat URL reset password lengkap dengan token
  const resetPasswordUrl = `${process.env.PUBLIC_APP_URL}/reset-password?token=${token}`;

  // Tampilan email dalam format HTML
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
    
      <div style="text-align:center; margin-bottom: 30px;">
        <img src="https://ik.imagekit.io/mf1j3kikz/jagad-cloud-logo.png" alt="Jagad Cloud" style="height: 60px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
      </div>

      <h1 style="color:#212121; text-align:center; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Reset Kata Sandi Anda</h1>
      <p style="text-align:center; color: #757575; font-size: 16px; margin-bottom: 25px;">
        Kami menerima permintaan untuk mereset kata sandi akun Anda.
      </p>
      
      <p style="text-align:left; color:#424242; line-height: 1.6;">
        Halo,
      </p>
      <p style="text-align:left; color:#424242; line-height: 1.6;">
        Untuk melanjutkan, silakan klik tombol di bawah ini. Anda akan diarahkan ke halaman di mana Anda dapat membuat kata sandi baru.
      </p>
      
      <p style="text-align:center; margin: 30px 0;">
        <a href="${resetPasswordUrl}" style="background-color:#d32f2f; color:#fff; padding:15px 25px; text-decoration:none; border-radius:8px; font-weight:bold; font-size: 16px; display: inline-block;">
          Reset Kata Sandi
        </a>
      </p>

      <p style="text-align:left; color:#757575; line-height: 1.6; font-size: 14px;">
        Tautan ini hanya berlaku selama **satu jam** untuk alasan keamanan.
      </p>
      
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      
      <p style="font-size: 12px; color: #9e9e9e; text-align: center;">
        Jika Anda tidak meminta perubahan kata sandi ini, abaikan email ini. Akun Anda tetap aman.<br/>
        Ini adalah email otomatis, mohon jangan membalas.
      </p>
    </div>
  `;

  // Kirim email
  await sendEmail({
    to: userEmail,
    subject: "Lupa Password - Jagad Cloud",
    html: emailHtml,
  });
}
