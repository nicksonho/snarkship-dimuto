import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { streamText } from "ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { responsibleParty, co2Wasted, costWasted, transport, delayDays, weight, userSpecs } = body

    // Create the prompt for the LLM
    const prompt = `Generate a snarky, humorous email to shame someone for causing shipping delays and environmental damage. 

Context:
- Responsible person: ${responsibleParty}
- CO₂ wasted: ${co2Wasted}kg
- Cost wasted: $${costWasted}
- Transport method: ${transport}
- Delay: ${delayDays} days
- Cargo weight: ${weight}kg

${userSpecs ? `User specifications: ${userSpecs}` : ""}

Requirements:
- Be sarcastic and humorous but not mean-spirited
- Include climate/environmental references
- Use Gen-Z humor and memes
- Include emojis
- Make it about accountability, not personal attacks
- Keep it professional enough for workplace use
- Include the specific numbers (CO₂, cost, days)
- Make it memorable and shareable

Generate both a subject line and email body. Format as:
Subject: [subject line]

[email body]`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.8, // Higher temperature for more creative/varied responses
    })

    return NextResponse.json({ email: text })
  } catch (error) {
    console.error("Error generating email:", error)
    return NextResponse.json({ error: "Failed to generate email" }, { status: 500 })
  }
}
