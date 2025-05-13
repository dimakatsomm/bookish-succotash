import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Database, FileText } from "lucide-react"

export default function Home() {
  // Check if device is already registered
  const isRegistered = cookies().has("device_registered")

  // If not registered, redirect to registration page
  if (!isRegistered) {
    redirect("/register")
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">VPOS Fiscal Management</h1>
          <p className="text-muted-foreground">
            Manage your inventory and invoices with the Gilbarco VPOS Fiscal system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/inventory" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Create and manage inventory readings from your fiscal device</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Submit inventory readings</li>
                  <li>Check inventory status</li>
                  <li>View inventory event logs</li>
                  <li>Track inventory across tanks</li>
                </ul>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Manage Inventory <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/invoices" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Invoice Management</CardTitle>
                <CardDescription>Upload and manage invoices for fiscalization</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Upload invoices for fiscalization</li>
                  <li>Check invoice status</li>
                  <li>View invoice event logs</li>
                  <li>Track fiscalization process</li>
                </ul>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Manage Invoices <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}
