import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import InventoryForm from "@/components/inventory-form"

export default function CreateInventoryPage() {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/register")
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/inventory">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create Inventory Reading</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Inventory Reading</CardTitle>
            <CardDescription>Enter the details for the new inventory reading</CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
