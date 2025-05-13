import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// The actual VPOS API base URL
const VPOS_API_BASE_URL = "https://api.vpos.fiscal.example.com/api"

// The API key for the VPOS API
const VPOS_API_KEY = process.env.VPOS_API_KEY || "your-api-key"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")
  if (!isRegistered) {
    return NextResponse.json({ error: "Device not registered" }, { status: 401 })
  }

  // Construct the path from the path segments
  const path = params.path.join("/")

  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const queryString = searchParams.toString()
  const url = `${VPOS_API_BASE_URL}/${path}${queryString ? `?${queryString}` : ""}`

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": VPOS_API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error(`Error proxying GET request to ${path}:`, error)
    return NextResponse.json({ error: "Failed to proxy request to VPOS API" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")
  if (!isRegistered) {
    return NextResponse.json({ error: "Device not registered" }, { status: 401 })
  }

  // Construct the path from the path segments
  const path = params.path.join("/")
  const url = `${VPOS_API_BASE_URL}/${path}`

  try {
    const body = await request.json()

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": VPOS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error(`Error proxying POST request to ${path}:`, error)
    return NextResponse.json({ error: "Failed to proxy request to VPOS API" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")
  if (!isRegistered) {
    return NextResponse.json({ error: "Device not registered" }, { status: 401 })
  }

  // Construct the path from the path segments
  const path = params.path.join("/")
  const url = `${VPOS_API_BASE_URL}/${path}`

  try {
    const body = await request.json()

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "x-api-key": VPOS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error(`Error proxying PUT request to ${path}:`, error)
    return NextResponse.json({ error: "Failed to proxy request to VPOS API" }, { status: 500 })
  }
}
