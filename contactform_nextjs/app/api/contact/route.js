import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message} = await req.json();

    // Validazione lato server
    if (!name || !email || !message) {
      throw new Error("Tutti i campi sono obbligatori");
    }

    if (name.length < 4 || name.length > 19) {
      throw new Error("Il campo 'name' deve avere tra 4 e 19 caratteri");
    }

    if (!isValidEmail(email)) {
      throw new Error("Formato email non valido");
    }

    if (message.length < 4 || message.length > 1000) {
      throw new Error("Il campo 'message' deve avere tra 4 e 1000 caratteri");
    }

    // nodemailer
    const transporter = nodemailer.createTransport({
        // test email from https://ethereal.email/
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.user_ethereal_email,
            pass: process.env.pass_ethereal_email
        }
    });
    const mailInfo = {
      from: email,
      to: process.env.user_ethereal_email,
      subject: `Contact form from ${name}`,
      html: `
        <p>You have a new contact form submission</p><br>
        <p><strong>Name: </strong>${name}</p><br>
        <p><strong>Message: </strong>${message}</p><br>
      `
  };

  await transporter.sendMail(mailInfo);

    return NextResponse.json({ message: 'Messaggio inviato con successo' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Errore durante l'invio del modulo di contatto" }, { status: 500 });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}
