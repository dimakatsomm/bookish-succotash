import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Package } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // Check if device is registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/")
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">
            Your device has been successfully registered. You now have access to the following features:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/invoicing" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Invoicing</CardTitle>
                <CardDescription>Create, manage, and send invoices to your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Generate professional invoices</li>
                  <li>Track payment status</li>
                  <li>Send automatic reminders</li>
                  <li>Export financial reports</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/products" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Product Capturing</CardTitle>
                <CardDescription>Manage your product inventory and catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Add and edit product details</li>
                  <li>Upload product images</li>
                  <li>Track inventory levels</li>
                  <li>Categorize and organize products</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}
