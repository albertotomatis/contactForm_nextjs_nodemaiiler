import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
    // Esegui qui la logica per gestire il modulo di contatto e inviare il messaggio.
    // Ad esempio, puoi utilizzare un modulo Node.js per inviare e-mail o salvare i messaggi nel database.
    return NextResponse.json({ message: 'Messaggio inviato con successo' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Errore durante l'invio del modulo di contatto" }, { status: 500 });
  }
}
