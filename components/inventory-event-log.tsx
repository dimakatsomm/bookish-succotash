"use client"

import { formatDistanceToNow } from "date-fns"

interface InventoryEventLogProps {
  events: any[]
}

export default function InventoryEventLog({ events }: InventoryEventLogProps) {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {events.map((event, index) => (
        <div key={index} className="border-b pb-3 last:border-0">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium">{event.statusCode}</span>
            <span className="text-xs text-muted-foreground">
              {event.dateTime ? formatDistanceToNow(new Date(event.dateTime), { addSuffix: true }) : "Unknown time"}
            </span>
          </div>
          <p className="text-sm">{event.statusMessage}</p>
          {event.revenueAuthorityMessage && (
            <p className="text-xs text-muted-foreground mt-1">Authority: {event.revenueAuthorityMessage}</p>
          )}
        </div>
      ))}
    </div>
  )
}
