"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// API base URL - relative since endpoints are running on the same device
const API_BASE_URL = "/api/vpos"

// Register device
export async function registerDevice(code: string) {
  // This is a simulated device registration
  // In a real application, you would validate the code against a database

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // For demo purposes, we'll accept any 6-digit code
  // In a real app, you would validate against your backend
  if (code.length === 6 && /^\d{6}$/.test(code)) {
    // Set a cookie to remember the device is registered
    cookies().set("device_registered", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return { success: true }
  }

  return {
    success: false,
    message: "Invalid registration code. Please try again.",
  }
}

// Inventory API functions
export async function createInventory(inventoryData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventory: [inventoryData] }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    revalidatePath("/inventory")
    return data
  } catch (error) {
    console.error("Failed to create inventory:", error)
    return { error: true, message: "Failed to create inventory" }
  }
}

export async function getInventories(status?: string) {
  try {
    const url = status ? `${API_BASE_URL}/inventories?status=${status}` : `${API_BASE_URL}/inventories`

    const response = await fetch(url, {
      headers: {},
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch inventories:", error)
    return []
  }
}

export async function getInventoryStatus(tankId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventories/${tankId}/status`, {
      headers: {},
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch inventory status for tank ${tankId}:`, error)
    return null
  }
}

export async function getInventoryEventLog(tankId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventories/${tankId}/eventLog`, {
      headers: {},
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch inventory event log for tank ${tankId}:`, error)
    return []
  }
}

// Invoice API functions
export async function createInvoice(invoiceData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    revalidatePath("/invoices")
    return data
  } catch (error) {
    console.error("Failed to create invoice:", error)
    return { error: true, message: "Failed to create invoice" }
  }
}

export async function getInvoices(status?: string) {
  try {
    const url = status ? `${API_BASE_URL}/invoices?status=${status}` : `${API_BASE_URL}/invoices`

    const response = await fetch(url, {
      headers: {},
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch invoices:", error)
    return []
  }
}

export async function getInvoiceStatus(documentId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices/${documentId}/status`, {
      headers: {},
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch invoice status for document ${documentId}:`, error)
    return null
  }
}

export async function getInvoiceEventLog(documentId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices/${documentId}/eventlog`, {
      headers: {},
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch invoice event log for document ${documentId}:`, error)
    return []
  }
}
