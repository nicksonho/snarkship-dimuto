"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Copy, Send, RefreshCw, Sparkles, Wand2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EmailPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [userSpecs, setUserSpecs] = useState("")
  const [regenerating, setRegenerating] = useState(false)

  const responsibleParty = searchParams.get("responsibleParty") || "Unknown"
  const co2Wasted = searchParams.get("co2") || "0"
  const costWasted = searchParams.get("cost") || "0"
  const transport = searchParams.get("transport") || "sea"
  const delayDays = searchParams.get("delayDays") || "0"
  const weight = searchParams.get("weight") || "0"

  const generateEmail = async (isRegeneration = false) => {
    if (isRegeneration) {
      setRegenerating(true)
    } else {
      setLoading(true)
    }

    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responsibleParty,
          co2Wasted,
          costWasted,
          transport,
          delayDays,
          weight,
          userSpecs: userSpecs.trim() || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate email")
      }

      const data = await response.json()
      setEmail(data.email)
    } catch (error) {
      console.error("Error generating email:", error)
      // Fallback to a default snarky message
      setEmail(`Subject: Your Delay is Killing the Planet 🌍💀

Hey ${responsibleParty},

Oops! Our AI is having a moment (probably from all the CO₂ in the air). 

But here's the tea: Your ${delayDays}-day delay wasted ${co2Wasted}kg of CO₂ and cost us $${costWasted}. 

That's not very cash money of you! 💸

Maybe next time we could try being on time? Just a thought! 🤔

Sarcastically yours,
The SnarkShip Team 🚢`)
    } finally {
      setLoading(false)
      setRegenerating(false)
    }
  }

  useEffect(() => {
    generateEmail()
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleRegenerate = () => {
    generateEmail(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/results?${searchParams.toString()}`}>
          <Button
            variant="outline"
            className="mb-8 border-snark-green text-snark-green hover:bg-snark-green hover:text-black bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Damage Report
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="font-heading text-6xl font-black text-transparent bg-gradient-to-r from-snark-pink to-snark-green bg-clip-text">
              AI SHAME GENERATOR 🤖
            </h1>
            <p className="text-xl text-gray-300">Powered by artificial intelligence and natural sarcasm! ✨</p>
          </div>

          {/* User Specifications */}
          <Card className="bg-gray-800 border-4 border-snark-blue">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-snark-blue flex items-center gap-2">
                <Wand2 className="w-6 h-6" />
                CUSTOMIZE YOUR ROAST 🎯
              </CardTitle>
              <p className="text-gray-300">Tell our AI how you want to shame them (optional but fun!)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specs" className="text-lg font-semibold text-snark-blue">
                  Special instructions for maximum embarrassment:
                </Label>
                <Textarea
                  id="specs"
                  placeholder="e.g., 'Make it extra sarcastic', 'Reference their love of coffee', 'Mention this is the 3rd time this month', 'Include a dad joke', etc."
                  value={userSpecs}
                  onChange={(e) => setUserSpecs(e.target.value)}
                  className="min-h-[100px] bg-gray-700 border-snark-blue text-white placeholder-gray-400 focus:border-snark-blue focus:ring-snark-blue"
                />
              </div>
              <Button
                onClick={handleRegenerate}
                disabled={loading || regenerating}
                className="bg-snark-blue text-black hover:bg-snark-blue/80 font-bold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {regenerating ? "Generating..." : "Generate with Specs"}
              </Button>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="bg-gray-800 border-4 border-snark-pink">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-3xl text-snark-pink">YOUR AI-CRAFTED SHAME EMAIL! 🔥</CardTitle>
              <p className="text-gray-300">Fresh from the digital roast kitchen ✨</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {loading ? (
                <div className="text-center space-y-4 py-12">
                  <div className="text-4xl animate-spin">🤖</div>
                  <div className="text-xl text-snark-green animate-pulse">AI is crafting your perfect roast...</div>
                  <div className="text-gray-400">This is going to be legendary! 🔥</div>
                  <div className="flex justify-center">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-snark-pink rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-snark-green rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-snark-blue rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Textarea
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-h-[400px] text-base bg-gray-700 border-snark-blue text-white font-mono leading-relaxed focus:border-snark-blue focus:ring-snark-blue"
                    placeholder="Your snarky email will appear here..."
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      onClick={copyToClipboard}
                      className="bg-snark-green text-black hover:bg-snark-green/80 font-bold px-8 py-3"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? "COPIED! 🎉" : "COPY EMAIL"}
                    </Button>

                    <Button
                      onClick={handleRegenerate}
                      disabled={regenerating}
                      variant="outline"
                      className="border-snark-blue text-snark-blue hover:bg-snark-blue hover:text-black font-bold px-8 py-3 bg-transparent"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${regenerating ? "animate-spin" : ""}`} />
                      {regenerating ? "GENERATING..." : "NEW AI ROAST"}
                    </Button>

                    <Button
                      disabled
                      className="bg-gray-600 text-gray-400 cursor-not-allowed font-bold px-8 py-3"
                      title="Coming soon!"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      SEND SNARK (Soon™)
                    </Button>
                  </div>

                  {copied && (
                    <div className="text-center text-snark-green font-bold animate-pulse">
                      Email copied! Now go forth and shame responsibly! 😈
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-snark-blue/20 to-snark-green/20 border-2 border-snark-blue">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-snark-blue text-center">AI ROASTING TIPS 🤖💡</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-bold text-snark-green">✅ TRY THESE SPECS:</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>• "Make it sound like a disappointed parent"</li>
                    <li>• "Include a climate change pun"</li>
                    <li>• "Reference their favorite TV show"</li>
                    <li>• "Make it rhyme like a rap battle"</li>
                    <li>• "Add a motivational twist at the end"</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-snark-pink">🎯 PRO TIPS:</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Each generation is unique thanks to AI</li>
                    <li>• More specific specs = better results</li>
                    <li>• Edit the generated email as needed</li>
                    <li>• The AI learns your company culture</li>
                    <li>• Keep it fun, not mean!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Over Button */}
          <div className="text-center pt-8">
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-8 py-4 border-snark-pink text-snark-pink hover:bg-snark-pink hover:text-white font-heading font-bold bg-transparent"
              >
                SHAME SOMEONE ELSE 🎯
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
