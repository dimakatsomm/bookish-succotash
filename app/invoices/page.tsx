import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { getInvoices } from "@/lib/actions"
import InvoiceTable from "@/components/invoice-table"

export default async function InvoicesPage() {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/register")
  }

  // Fetch invoices
  const invoices = await getInvoices()

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Invoice Management</h1>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Upload and manage invoices for fiscalization</p>
          <Link href="/invoices/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>View and manage your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            {Array.isArray(invoices) && invoices.length > 0 ? (
              <InvoiceTable invoices={invoices} />
            ) : (
              <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                <p className="text-muted-foreground">No invoices found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
