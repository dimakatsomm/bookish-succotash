import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getInventoryStatus, getInventoryEventLog } from "@/lib/actions"
import InventoryDetails from "@/components/inventory-details"
import InventoryEventLog from "@/components/inventory-event-log"

interface InventoryDetailPageProps {
  params: {
    tankId: string
  }
}

export default async function InventoryDetailPage({ params }: InventoryDetailPageProps) {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/register")
  }

  const tankId = Number.parseInt(params.tankId)

  // Fetch inventory status and event log
  const inventoryStatus = await getInventoryStatus(tankId)
  const eventLog = await getInventoryEventLog(tankId)

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/inventory">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Inventory Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tank Information</CardTitle>
                <CardDescription>Details for tank #{params.tankId}</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryStatus ? (
                  <InventoryDetails inventory={inventoryStatus} />
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">No inventory data found for this tank</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Current status and authority details</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryStatus ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Status:</div>
                      <div className="text-sm">{inventoryStatus.status || "Unknown"}</div>

                      <div className="text-sm font-medium">Authority Ref:</div>
                      <div className="text-sm">{inventoryStatus.revenueAuthorityReference || "N/A"}</div>

                      <div className="text-sm font-medium">Authority Message:</div>
                      <div className="text-sm">{inventoryStatus.revenueAuthorityMessage || "N/A"}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No status information available</p>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Event Log</CardTitle>
                <CardDescription>History of events for this tank</CardDescription>
              </CardHeader>
              <CardContent>
                {Array.isArray(eventLog) && eventLog.length > 0 ? (
                  <InventoryEventLog events={eventLog} />
                ) : (
                  <p className="text-muted-foreground">No event logs available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
