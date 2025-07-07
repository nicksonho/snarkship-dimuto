"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Flame, DollarSign, Zap } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState({
    co2Wasted: 0,
    costWasted: 0,
    petrolEquivalent: 0,
    treesNeeded: 0,
  })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Only run calculation once when component mounts or search params change
    const weight = Number.parseFloat(searchParams.get("weight") || "0")
    const transport = searchParams.get("transport") || "sea"
    const delayDays = Number.parseFloat(searchParams.get("delayDays") || "0")

    // Simplified CO2 calculation (kg CO2 per kg cargo per day)
    const co2Factors = {
      air: 2.5,
      sea: 0.1,
      land: 0.5,
    }

    const co2Wasted = weight * (co2Factors[transport as keyof typeof co2Factors] || 0.1) * delayDays
    const costWasted = co2Wasted * 0.05 * 100 // Rough cost estimate
    const petrolEquivalent = co2Wasted / 2.3 // kg CO2 per liter of petrol
    const treesNeeded = co2Wasted / 22 // kg CO2 absorbed per tree per year

    const newResults = {
      co2Wasted: Math.round(co2Wasted * 100) / 100,
      costWasted: Math.round(costWasted * 100) / 100,
      petrolEquivalent: Math.round(petrolEquivalent * 100) / 100,
      treesNeeded: Math.round(treesNeeded * 100) / 100,
    }

    setResults(newResults)

    // Show confetti for high CO2 values
    if (co2Wasted > 100) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const responsibleParty = searchParams.get("responsibleParty") || "Unknown"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {["💀", "🔥", "☠️", "💨", "🌍"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <Link href="/calculate">
          <Button
            variant="outline"
            className="mb-8 border-snark-green text-snark-green hover:bg-snark-green hover:text-black bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Recalculate Shame
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="font-heading text-6xl font-black text-transparent bg-gradient-to-r from-snark-pink to-snark-green bg-clip-text">
              DAMAGE REPORT 📊
            </h1>
            <p className="text-xl text-gray-300">
              Congratulations {responsibleParty}, here's your environmental destruction summary:
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* CO2 Wasted */}
            <Card className="bg-gradient-to-br from-red-900/50 to-snark-pink/30 border-4 border-snark-pink">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl text-snark-pink flex items-center justify-center gap-2">
                  <Flame className="w-8 h-8 animate-shake" />
                  CO₂ WASTED
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-heading font-black text-white mb-2">{results.co2Wasted}</div>
                <div className="text-2xl text-snark-pink font-bold">kg CO₂ ☠️</div>
                {results.co2Wasted > 100 && (
                  <div className="mt-4 text-lg text-red-400 animate-pulse">Over 100kg CO₂? Bruh. 🤦‍♂️</div>
                )}
              </CardContent>
            </Card>

            {/* Cost Wasted */}
            <Card className="bg-gradient-to-br from-green-900/50 to-snark-green/30 border-4 border-snark-green">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl text-snark-green flex items-center justify-center gap-2">
                  <DollarSign className="w-8 h-8 animate-bounce" />
                  MONEY BURNED
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-heading font-black text-white mb-2">${results.costWasted}</div>
                <div className="text-2xl text-snark-green font-bold">Down the drain 💸</div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Equivalents */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-snark-blue/30 border-4 border-snark-blue">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-3xl text-snark-blue flex items-center justify-center gap-2">
                <Zap className="w-8 h-8 animate-pulse" />
                FUN EQUIVALENTS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-4xl">⛽</div>
                  <div className="text-2xl font-bold text-white">{results.petrolEquivalent} liters</div>
                  <div className="text-snark-blue">of petrol burned for fun</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">🌳</div>
                  <div className="text-2xl font-bold text-white">{results.treesNeeded} trees</div>
                  <div className="text-snark-blue">needed to offset this mess</div>
                </div>
              </div>
              <div className="text-center text-lg text-gray-300 italic">
                "That's like burning {results.petrolEquivalent} liters of petrol for absolutely no reason. Congrats! 🎉"
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="text-center pt-8">
            <Link href={`/email?${searchParams.toString()}&co2=${results.co2Wasted}&cost=${results.costWasted}`}>
              <Button
                size="lg"
                className="text-2xl px-12 py-6 bg-gradient-to-r from-snark-pink via-snark-green to-snark-blue text-white font-heading font-black hover:scale-105 transform transition-all duration-200 shadow-2xl border-4 border-white animate-pulse"
              >
                GENERATE SNARKY EMAIL 📧
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
