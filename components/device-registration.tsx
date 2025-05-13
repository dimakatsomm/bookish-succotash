"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ShieldCheck } from "lucide-react"
import { registerDevice } from "@/lib/actions"

export default function DeviceRegistration() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await registerDevice(code)
      if (result.success) {
        router.push("/")
      } else {
        setError(result.message || "Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Device Registration</CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit registration code to activate your VPOS Fiscal device
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Device"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
        <p>Having trouble? Contact support at support@example.com</p>
      </CardFooter>
    </Card>
  )
}
