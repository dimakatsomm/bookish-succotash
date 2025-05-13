import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import DeviceRegistration from "@/components/device-registration"

export default function RegisterPage() {
  // Check if device is already registered
  const isRegistered = cookies().has("device_registered")

  // If already registered, redirect to dashboard
  if (isRegistered) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <DeviceRegistration />
    </main>
  )
}
