"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Ship, Zap, Skull } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant="outline"
          className="bg-snark-pink text-white border-snark-pink hover:bg-snark-pink/80"
        >
          Darker Mood 🌙
        </Button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-heading text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-snark-pink via-snark-green to-snark-blue bg-clip-text animate-pulse-fast">
              SNARKSHIP
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-600 dark:text-gray-300">
              "Turning your delays into climate shame, one email at a time."
            </p>
          </div>

          {/* Cartoon Ship Illustration */}
          <div className="flex justify-center my-12">
            <Card className="p-8 bg-gradient-to-br from-snark-blue/20 to-snark-pink/20 border-4 border-snark-green animate-bounce-slow">
              <div className="relative">
                <Ship className="w-32 h-32 text-snark-blue" />
                <div className="absolute -top-4 -right-2 animate-shake">
                  <div className="text-4xl">💨</div>
                </div>
                <div className="absolute -top-8 right-4 animate-pulse">
                  <div className="text-2xl">☠️</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Snarky Description */}
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl font-body text-gray-700 dark:text-gray-300">
              Global trade inefficiencies cause invisible CO₂ waste, financial losses, and operational drag. Yet the
              people responsible rarely feel the true impact of a missed shipment or delayed document.
            </p>
            <p className="text-lg font-body text-snark-pink font-semibold">Oops, you killed the planet again 🙄</p>
          </div>

          {/* Main CTA */}
          <div className="pt-8">
            <Link href="/calculate">
              <Button
                size="lg"
                className="text-2xl px-12 py-6 bg-gradient-to-r from-snark-pink to-snark-green text-white font-heading font-black hover:scale-105 transform transition-all duration-200 shadow-2xl border-4 border-snark-blue animate-pulse"
              >
                CALCULATE YOUR GUILT 😈
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="p-6 bg-snark-pink/10 border-2 border-snark-pink hover:scale-105 transition-transform">
              <Zap className="w-12 h-12 text-snark-pink mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Lightning Fast Shame</h3>
              <p className="font-body text-gray-600 dark:text-gray-400">
                Calculate CO₂ waste in seconds. Because waiting longer would be... ironic.
              </p>
            </Card>

            <Card className="p-6 bg-snark-green/10 border-2 border-snark-green hover:scale-105 transition-transform">
              <Skull className="w-12 h-12 text-snark-green mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Deadly Accurate</h3>
              <p className="font-body text-gray-600 dark:text-gray-400">
                Precise calculations that'll make you question your life choices.
              </p>
            </Card>

            <Card className="p-6 bg-snark-blue/10 border-2 border-snark-blue hover:scale-105 transition-transform">
              <Ship className="w-12 h-12 text-snark-blue mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Snarky AF Emails</h3>
              <p className="font-body text-gray-600 dark:text-gray-400">
                AI-generated roasts that'll make your colleagues rethink their logistics.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
