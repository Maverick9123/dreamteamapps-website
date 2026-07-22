import Anthropic from '@anthropic-ai/sdk'
import { rateGuard, clientIp } from '../../../lib/rateGuard'

// Reuses the same ANTHROPIC_API_KEY already configured on Vercel for the site chat.
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are the chart assistant inside GigStand, an app for gigging musicians.
Your job: take a song's LYRICS and its CHORDS and produce a clean, stage-ready ChordPro chart.

OUTPUT FORMAT — ChordPro:
- Put each chord in square brackets IMMEDIATELY before the syllable where that chord starts,
  with no space between the bracket and the letter. Example: "[G]Amazing [C]grace how [G]sweet".
- Begin with directive lines when the info is available:
    {title: <song title>}
    {key: <key>}
    {tempo: <bpm>}   (only if a tempo/BPM is provided)
- Mark sections with compact comment directives on their own line: {comment: Verse 1}, {comment: Chorus},
  {comment: Bridge}, etc. Keep these tight — no blank lines around them.
- Preserve the user's exact lyrics and line breaks. Do not rewrite, censor, or "improve" the words.
- Fix obvious lyric typos only if clearly unintentional; otherwise leave the words as given.

PLACING THE CHORDS:
- The chords may arrive as a plain progression, a list, or Chordify-style text (chords with no lyrics).
  They are given in song order. Distribute them over the lyrics using musical sense: place chord changes
  on stressed syllables and at the start of phrases, and reuse the repeating progression across repeating
  sections (verses share a pattern, choruses share a pattern).
- If there are clearly more chords than needed for a line, spread them sensibly; if fewer, hold the last
  chord. It is fine for a line to have one chord or several.
- If NO chords are provided, still return the lyrics as a valid ChordPro chart with section labels and no
  chord brackets.

IMPORTANT:
- Output ONLY the finished ChordPro chart text. No preamble, no explanation, no commentary, and no
  Markdown code fences. The very first characters of your reply must be the chart itself.`

export async function POST(request: Request) {
  try {
    // Shared-secret guard: only requests carrying the matching key are served.
    // Enforced only when GIGSTAND_API_SECRET is configured on the server, so the
    // endpoint never breaks before the environment variable is set.
    const requiredSecret = process.env.GIGSTAND_API_SECRET
    if (requiredSecret) {
      const provided = request.headers.get('x-gigstand-key')
      if (provided !== requiredSecret) {
        return new Response(JSON.stringify({ error: 'Unauthorized.' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    // Abuse guard: cap per-IP bursts and total daily Anthropic calls (the wallet
    // trap). Fail-open — no effect until Vercel KV is connected.
    const guard = await rateGuard(
      'gigstand-chart',
      clientIp(request.headers),
      Number(process.env.CHART_IP_PER_MIN ?? 6),
      Number(process.env.CHART_GLOBAL_PER_DAY ?? 300)
    )
    if (!guard.ok) {
      return new Response(
        JSON.stringify({
          error:
            guard.reason === 'global'
              ? 'The chart assistant is busy right now. Please try again later.'
              : 'Too many requests. Please wait a moment and try again.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': String(guard.retryAfter) },
        }
      )
    }

    const body = await request.json()
    const lyrics: string = (body?.lyrics ?? '').toString()
    const chords: string = (body?.chords ?? '').toString()
    const title: string = (body?.title ?? '').toString()
    const key: string = (body?.key ?? '').toString()

    if (!lyrics.trim()) {
      return new Response(JSON.stringify({ error: 'Please provide the song lyrics.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const userMessage =
      `Title: ${title.trim() || '(none given)'}\n` +
      `Key: ${key.trim() || '(unknown)'}\n\n` +
      `CHORDS (song order; may be a progression, a list, or Chordify text — may be empty):\n` +
      `${chords.trim() || '(none provided)'}\n\n` +
      `LYRICS:\n${lyrics.trim()}`

    const msg = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const chart = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()

    if (!chart) {
      return new Response(JSON.stringify({ error: 'The assistant returned an empty chart. Try again.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ chart }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('generate-chart error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate the chart. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
