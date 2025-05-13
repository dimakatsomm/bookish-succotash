"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface InvoiceTableProps {
  invoices: any[]
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  // Function to determine badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "NEW":
        return <Badge variant="outline">New</Badge>
      case "SUBMITTED":
        return <Badge className="bg-blue-500">Submitted</Badge>
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>
      case "LOCKED":
        return <Badge className="bg-yellow-500">Locked</Badge>
      case "SUBMITTING":
        return <Badge className="bg-purple-500">Submitting</Badge>
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document ID</TableHead>
            <TableHead>Document Number</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.documentId}>
              <TableCell className="font-medium">{invoice.documentId}</TableCell>
              <TableCell>{invoice.documentNumber}</TableCell>
              <TableCell>{invoice.issueDateTime ? format(new Date(invoice.issueDateTime), "PPP") : "N/A"}</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              <TableCell className="text-right">
                <Link href={`/invoices/${invoice.documentId}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
