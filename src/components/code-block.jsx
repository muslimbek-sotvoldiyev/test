"use client"

import { useEffect, useRef } from "react"


export function CodeBlock({ code }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const fontSize = 16
    const lineHeight = fontSize * 1.5
    const padding = 20

    // Split code into lines
    const lines = code.split("\n")

    // Set text style for measurement
    ctx.font = `${fontSize}px monospace`

    // Calculate canvas dimensions - ensure enough width
    const maxLineWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
    const canvasWidth = Math.max(maxLineWidth + padding * 2, 400) // Minimum width of 400px
    const canvasHeight = lines.length * lineHeight + padding * 2

    // Set canvas dimensions with device pixel ratio for sharper text
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr

    // Scale canvas for retina displays
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    ctx.scale(dpr, dpr)

    // Set background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw border
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight)

    // Set text style
    ctx.font = `${fontSize}px monospace`
    ctx.fillStyle = "#1e293b"
    ctx.textBaseline = "top"

    // Draw text
    lines.forEach((line, index) => {
      ctx.fillText(line, padding, padding + lineHeight * index)
    })

    // Add watermark to prevent copying
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(100, 100, 100, 0.2)"
    ctx.fillText("Nusxa ko'chirib bo'lmaydi", canvasWidth / 2 - 70, canvasHeight - 15)
  }, [code])

  return (
    <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50 mb-4">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ userSelect: "none" }}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}></div>
    </div>
  )
}
