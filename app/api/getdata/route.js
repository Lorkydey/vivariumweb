// http://localhost:3000/api/getdata

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    console.log("Reçu:", params);
    const responseData = { message: "Data recu", received: params };
    console.log("Rep:", responseData);
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Err:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Lire le body de ta mere la pute qui fonctionne pas (jcrois)
    const text = await request.text();
    if (!text) {
      console.log("Reçu: YA RIEN FDP");
      return NextResponse.json({ message: "PAS DATA TA MERE" }, { status: 400 });
    }
    // Parser le JSON
    const body = JSON.parse(text);
    console.log("Reçu:", body);
    if (body.temperature !== undefined) {
      console.log("Temp reçue:", body.temperature);
    }
    const responseData = { message: "Data recu", received: body };
    console.log("Réponse:", responseData);
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Erreur POST :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
