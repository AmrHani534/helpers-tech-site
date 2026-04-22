import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are HelperBot, the friendly AI assistant for Helpers Technologies — a Giza, Egypt based digital agency building websites, mobile apps, and AI automation for ambitious brands.

Speak concisely and warmly. Focus on how Helpers can help the user's business grow. Keep replies under 4 short sentences unless asked for more detail.

Services: Custom Web Development (Next.js, React), Mobile App Development (iOS/Android), AI & Automation Systems (chatbots, Gemini integrations, workflow automation), Digital Growth Strategy.

Pricing: Launch Pack from $250. Business Bundles from $400. Custom projects quoted after a discovery call. We typically require a 50% deposit to start.

Contact: WhatsApp +20 111 844 5625, email info@helpers-tech.com. Founders: Amr Hani (CEO) and Amr Ahmed El Doweik (Co-Founder).

If the user asks something off-topic, politely steer back to how Helpers can help their business. If they ask for a quote or project details, suggest WhatsApp or the /contact page.`;

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "The AI assistant is not configured yet. Please reach out on WhatsApp!" },
      { status: 200 },
    );
  }

  let body: { messages?: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
  }
  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return NextResponse.json({ reply: "How can I help you today?" });
  }

  const contents = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
        }),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      console.error("[chat] gemini error", res.status, text);
      return NextResponse.json({
        reply:
          "I'm having a bit of trouble right now. Please reach out to us on WhatsApp!",
      });
    }
    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I apologize, I couldn't generate a response at the moment.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] network error", err);
    return NextResponse.json({
      reply: "Sorry, I'm having trouble connecting. Please try again later.",
    });
  }
}
