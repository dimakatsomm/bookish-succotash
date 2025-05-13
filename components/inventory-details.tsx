"use client"

interface InventoryDetailsProps {
  inventory: any
}

export default function InventoryDetails({ inventory }: InventoryDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Tank ID</h3>
          <p className="text-lg font-semibold">{inventory.tankId}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Fuel Grade</h3>
          <p className="text-lg font-semibold">
            {inventory.fuelGradeName} ({inventory.fuelGradeId})
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Commodity Code</h3>
          <p className="text-lg font-semibold">{inventory.commodityCode || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Volume</h3>
          <p className="text-lg font-semibold">{inventory.volume} L</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-3">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inventory.temperatureCompensatedVolume !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Temp. Comp. Volume</h4>
              <p>{inventory.temperatureCompensatedVolume} L</p>
            </div>
          )}

          {inventory.ullage !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Ullage</h4>
              <p>{inventory.ullage} L</p>
            </div>
          )}

          {inventory.fuelHeight !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Fuel Height</h4>
              <p>{inventory.fuelHeight} mm</p>
            </div>
          )}

          {inventory.waterHeight !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Water Height</h4>
              <p>{inventory.waterHeight} mm</p>
            </div>
          )}

          {inventory.temperature !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Temperature</h4>
              <p>{inventory.temperature} °C</p>
            </div>
          )}

          {inventory.waterVolume !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Water Volume</h4>
              <p>{inventory.waterVolume} L</p>
            </div>
          )}

          {inventory.density !== undefined && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground">Density</h4>
              <p>{inventory.density} kg/m³</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
