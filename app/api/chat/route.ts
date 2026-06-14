import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a friendly and knowledgeable AI support assistant for DreamTeamApps, 
a company that builds premium iOS apps. You help customers with questions about:

**FishingPalPro** 🎣
- Optimal fishing times using Farmers Almanac data and lunar phases
- Real-time weather integration
- GPS-based catch logging with map view
- Siri voice control ("Hey Siri, log a catch")
- Fishing calendar and reminders
- Subscription tiers (free vs. premium features)
- App Store subscription management (cancel, restore purchases)

**PlayListAI** 🎵
- AI-powered playlist creation and management
- Integrates with Apple Music and Spotify
- Siri voice control for hands-free playlist management
- Offline playback capabilities
- Genre-based playlist generation
- Subscription management

**General support guidance:**
- Be concise, friendly, and helpful
- If you cannot solve the issue (e.g., account-specific billing, bugs requiring a fix), 
  say so clearly and suggest they submit a support ticket
- Never make up features that don't exist
- For subscription/billing issues, direct them to App Store settings on their iPhone
- Keep replies under 150 words unless the question requires more detail
- Do not use excessive markdown — plain conversational text is preferred`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request', { status: 400 })
    }

    const stream = client.messages.stream({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Failed to process chat', { status: 500 })
  }
}
