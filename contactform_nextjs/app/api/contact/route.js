import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message} = await req.json();

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
    await transporter.sendMail({
        from: email,
        to: process.env.user_ethereal_email,
        subject: `Contact form from ${name}`,
        html: `<p>You have a new contact form submission</p><br>
        <p><strong>Name: </strong>${name}</p><br>
        <p><strong>Message: </strong>${message}</p><br>`
    });

    return NextResponse.json({ message: 'Messaggio inviato con successo' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Errore durante l'invio del modulo di contatto" }, { status: 500 });
  }
}
