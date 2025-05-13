import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { getInventories } from "@/lib/actions"
import InventoryTable from "@/components/inventory-table"

export default async function InventoryPage() {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/register")
  }

  // Fetch inventories
  const inventories = await getInventories()

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Manage your inventory readings from the fiscal device</p>
          <Link href="/inventory/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Inventory Reading
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Readings</CardTitle>
            <CardDescription>View and manage your inventory readings</CardDescription>
          </CardHeader>
          <CardContent>
            {Array.isArray(inventories) && inventories.length > 0 ? (
              <InventoryTable inventories={inventories} />
            ) : (
              <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                <p className="text-muted-foreground">No inventory readings found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
