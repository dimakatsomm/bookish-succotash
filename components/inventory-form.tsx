"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { createInventory } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

// Define the form schema
const formSchema = z.object({
  tankId: z.coerce.number().int().positive("Tank ID must be a positive integer"),
  fuelGradeId: z.string().min(1, "Fuel Grade ID is required"),
  fuelGradeName: z.string().min(1, "Fuel Grade Name is required"),
  commodityCode: z.string().optional(),
  volume: z.coerce.number().positive("Volume must be a positive number"),
  temperatureCompensatedVolume: z.coerce.number().optional(),
  ullage: z.coerce.number().optional(),
  fuelHeight: z.coerce.number().optional(),
  waterHeight: z.coerce.number().optional(),
  temperature: z.coerce.number().optional(),
  waterVolume: z.coerce.number().optional(),
  density: z.coerce.number().optional(),
})

export default function InventoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tankId: undefined,
      fuelGradeId: "",
      fuelGradeName: "",
      commodityCode: "00",
      volume: undefined,
      temperatureCompensatedVolume: undefined,
      ullage: undefined,
      fuelHeight: undefined,
      waterHeight: undefined,
      temperature: undefined,
      waterVolume: undefined,
      density: undefined,
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await createInventory(values)

      if (result.error) {
        toast({
          title: "Error",
          description: result.message || "Failed to create inventory reading",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Inventory reading created successfully",
        })
        router.push("/inventory")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tankId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tank ID *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter tank ID" {...field} />
                </FormControl>
                <FormDescription>The unique identifier for the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelGradeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Grade ID *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter fuel grade ID" {...field} />
                </FormControl>
                <FormDescription>The ID of the fuel grade for this tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelGradeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Grade Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter fuel grade name" {...field} />
                </FormControl>
                <FormDescription>The name/description of the fuel grade</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commodityCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commodity Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter commodity code (default: 00)" {...field} />
                </FormControl>
                <FormDescription>The commodity code as defined by the revenue authority</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume *</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter volume" {...field} />
                </FormControl>
                <FormDescription>The volume from the tank in liters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="temperatureCompensatedVolume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature Compensated Volume</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter temperature compensated volume" {...field} />
                </FormControl>
                <FormDescription>The temperature compensated volume from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ullage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ullage</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter ullage" {...field} />
                </FormControl>
                <FormDescription>The ullage from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Height</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter fuel height" {...field} />
                </FormControl>
                <FormDescription>The fuel height from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waterHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Height</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter water height" {...field} />
                </FormControl>
                <FormDescription>The water height from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter temperature" {...field} />
                </FormControl>
                <FormDescription>The temperature from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waterVolume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Volume</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter water volume" {...field} />
                </FormControl>
                <FormDescription>The water volume from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="density"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Density</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter density" {...field} />
                </FormControl>
                <FormDescription>The density from the tank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/inventory")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
