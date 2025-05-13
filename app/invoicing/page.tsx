import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function InvoicingPage() {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/")
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Invoicing</h1>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Create and manage your invoices</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>You haven't created any invoices yet. Click "New Invoice" to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
              <p className="text-muted-foreground">No invoices found</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
