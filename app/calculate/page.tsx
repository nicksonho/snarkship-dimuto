"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Ship, Truck, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CalculatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    weight: "",
    transport: "",
    delayDays: "",
    responsibleParty: "",
    responsibleEmail: "",
  })
  const [loading, setLoading] = useState(false)
  const [showSnarkyPopup, setShowSnarkyPopup] = useState(false)
  const [snarkyMessage, setSnarkyMessage] = useState("")

  const snarkyMessages = [
    "Really? Negative weight? Did your cargo achieve anti-gravity? 🚀 Physics called, they want their laws back!",
    "Negative days? Congrats, you've invented time travel! ⏰ Too bad you can't use it to fix your logistics!",
    "Oh wow, negative numbers! Are we doing imaginary math now? 🤡 This isn't Hogwarts, buddy!",
    "Negative values? What is this, opposite day? 🙃 Let's stick to reality, shall we?",
    "Did you just try to enter negative numbers? 🤦‍♂️ That's not how cargo works, genius!",
    "Negative weight/days? Are you from a parallel universe? 🌌 Back to Earth, please!",
    "Trying to break the system with negatives? 😏 Nice try, but I'm smarter than that!",
  ]

  const showSnarkyValidation = () => {
    const randomMessage = snarkyMessages[Math.floor(Math.random() * snarkyMessages.length)]
    setSnarkyMessage(randomMessage)
    setShowSnarkyPopup(true)
    setTimeout(() => setShowSnarkyPopup(false), 4000)
  }

  const handleNumberInput = (value: string, field: "weight" | "delayDays") => {
    const numValue = Number.parseFloat(value)

    if (numValue < 0) {
      showSnarkyValidation()
      setFormData({ ...formData, [field]: "0" })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      const params = new URLSearchParams(formData)
      router.push(`/results?${params.toString()}`)
    }, 2000)
  }

  const transportIcons = {
    air: <Plane className="w-6 h-6" />,
    sea: <Ship className="w-6 h-6" />,
    land: <Truck className="w-6 h-6" />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      {/* Snarky Popup */}
      {showSnarkyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSnarkyPopup(false)} />
          <Card className="relative z-10 max-w-md w-full bg-gradient-to-br from-snark-pink/90 to-snark-green/90 border-4 border-white animate-shake">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-between items-center">
                <div className="text-4xl">🤦‍♂️</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSnarkyPopup(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-white font-bold text-lg leading-relaxed">{snarkyMessage}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="outline"
            className="mb-8 border-snark-green text-snark-green hover:bg-snark-green hover:text-black bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shame Central
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-4 border-snark-pink">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-4xl text-snark-pink mb-4">CONFESS YOUR SINS 😈</CardTitle>
              <p className="text-lg text-gray-300">Time to face the music. How badly did you mess up this time?</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Weight Input */}
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-lg font-semibold text-snark-green">
                    How heavy is your cargo of shame? (kg) 📦
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 1000"
                    value={formData.weight}
                    onChange={(e) => handleNumberInput(e.target.value, "weight")}
                    className="text-lg p-4 bg-gray-700 border-snark-green text-white placeholder-gray-400 focus:border-snark-green focus:ring-snark-green"
                    required
                  />
                </div>

                {/* Transport Mode */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-snark-blue">How did you pollute the planet? 🌍</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, transport: value })} required>
                    <SelectTrigger className="text-lg p-4 bg-gray-700 border-snark-blue text-white focus:border-snark-blue focus:ring-snark-blue">
                      <SelectValue placeholder="Choose your weapon of mass emission" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-snark-blue text-white">
                      <SelectItem
                        value="air"
                        className="text-white hover:bg-snark-blue/20 focus:bg-snark-blue/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Plane className="w-4 h-4" />
                          Air (Maximum Damage) ✈️
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="sea"
                        className="text-white hover:bg-snark-blue/20 focus:bg-snark-blue/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Ship className="w-4 h-4" />
                          Sea (Slow but Steady Destruction) 🚢
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="land"
                        className="text-white hover:bg-snark-blue/20 focus:bg-snark-blue/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Land (Least Terrible Option) 🚛
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Delay Days */}
                <div className="space-y-2">
                  <Label htmlFor="delay" className="text-lg font-semibold text-snark-pink">
                    How many days late were you? (Really? Again?!) 📅
                  </Label>
                  <Input
                    id="delay"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g., 3"
                    value={formData.delayDays}
                    onChange={(e) => handleNumberInput(e.target.value, "delayDays")}
                    className="text-lg p-4 bg-gray-700 border-snark-pink text-white placeholder-gray-400 focus:border-snark-pink focus:ring-snark-pink"
                    required
                  />
                </div>

                {/* Responsible Party */}
                <div className="space-y-2">
                  <Label htmlFor="responsible" className="text-lg font-semibold text-snark-green">
                    Who's the culprit? (Name & Shame) 👤
                  </Label>
                  <Input
                    id="responsible"
                    type="text"
                    placeholder="e.g., John from Logistics"
                    value={formData.responsibleParty}
                    onChange={(e) => setFormData({ ...formData, responsibleParty: e.target.value })}
                    className="text-lg p-4 bg-gray-700 border-snark-green text-white placeholder-gray-400 focus:border-snark-green focus:ring-snark-green"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-snark-blue">
                    Their email (for maximum embarrassment) 📧
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.responsibleEmail}
                    onChange={(e) => setFormData({ ...formData, responsibleEmail: e.target.value })}
                    className="text-lg p-4 bg-gray-700 border-snark-blue text-white placeholder-gray-400 focus:border-snark-blue focus:ring-snark-blue"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full text-2xl py-6 bg-gradient-to-r from-snark-pink via-snark-green to-snark-blue text-white font-heading font-black hover:scale-105 transform transition-all duration-200 shadow-2xl disabled:hover:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin">⚡</div>
                        Loading your sins...
                      </div>
                    ) : (
                      "CALCULATE CO₂ SHAME 🔥"
                    )}
                  </Button>
                </div>
              </form>

              {loading && (
                <div className="text-center space-y-4 mt-8">
                  <div className="text-snark-green animate-pulse">
                    Crunching the numbers of your environmental destruction...
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-snark-pink to-snark-green h-4 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
