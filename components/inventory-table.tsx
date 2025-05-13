"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

interface InventoryTableProps {
  inventories: any[]
}

export default function InventoryTable({ inventories }: InventoryTableProps) {
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
            <TableHead>Tank ID</TableHead>
            <TableHead>Fuel Grade</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventories.map((inventory) => (
            <TableRow key={inventory.tankId}>
              <TableCell className="font-medium">{inventory.tankId}</TableCell>
              <TableCell>{inventory.fuelGradeName}</TableCell>
              <TableCell>{inventory.volume} L</TableCell>
              <TableCell>{getStatusBadge(inventory.status)}</TableCell>
              <TableCell className="text-right">
                <Link href={`/inventory/${inventory.tankId}`}>
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
