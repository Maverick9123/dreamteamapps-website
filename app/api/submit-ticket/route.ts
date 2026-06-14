import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const res = await fetch('https://app-support-desk-three.vercel.app/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error(`AppSupport Desk returned ${res.status}`)
    }

    const ticket = await res.json()
    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('Ticket proxy error:', error)
    return NextResponse.json({ error: 'Failed to submit ticket' }, { status: 500 })
  }
}
