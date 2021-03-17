import nodemailer from 'nodemailer';

interface MailProps {
  name: string;
  email: string;
  subject: string;
  body: string;
}

async function SendMail({
  name,
  email,
  subject,
  body,
}: MailProps): Promise<string | null> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const options = {
    from: email,
    to: 'kokily@naver.com',
    subject: 'The Y 컴퍼니 홈페이지 문의 메일 알림',
    html: `
      <h2>
        제목 : ${subject}
      </h2>
      <h3>
        작성자 : ${name} 님 (${email})
      </h3>
      <p>
        ${body}
      </p>
    `,
  };

  try {
    await transporter.sendMail(options);

    return subject;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export default SendMail;
