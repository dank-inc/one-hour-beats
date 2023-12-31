import React, { useRef, useEffect } from 'react'
import { Jam } from 'types/Jam'
import { DateTime } from 'luxon'

type Props = {
  jam: Jam
  height?: number
  width?: number
  popout?: boolean
}
export const Clock = ({ jam, width = 200, height = 200, popout }: Props) => {
  // use jamContext
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    canvasRef.current.width = width
    canvasRef.current.height = height

    const draw = () => {
      if (!ctx || !canvasRef.current || !jam.started_at) return

      const started_at = DateTime.fromISO(jam.started_at)
      const currentTime = DateTime.now()
      const endTime = started_at.plus({ minutes: jam.time_limit })

      const elapsed = +currentTime - +started_at // ms
      const total = +endTime - +started_at // ms
      const remaining = total - elapsed // ms

      const u = remaining / total // percent

      const secondsRemaining = remaining / 1000

      const minute = (secondsRemaining % 60) / 60
      const second = secondsRemaining % 1

      const w = width / 2
      const h = height / 2
      const hr = w * 0.8
      const mr = w * 0.6
      const sr = w * 0.4

      const ru = Math.abs(u - 1)

      const sat = ru * 100
      const hue = Math.abs(u * 30)

      ctx.save()

      ctx.clearRect(0, 0, width, height)
      ctx.translate(w, h)
      ctx.rotate(Math.PI / 2)

      ctx.lineWidth = width / 10

      ctx.strokeStyle = `hsl(${hue}, ${sat}%, 30%)`
      ctx.beginPath()
      ctx.arc(0, 0, hr, 0, u * Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = `hsl(${hue}, ${sat}%, 50%)`
      ctx.beginPath()
      ctx.arc(0, 0, mr, 0, minute * Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      const s = Math.abs(1 - second * second * second * 0.5)
      ctx.fillStyle = `hsl(${hue}, ${sat}%, ${s * 100}%)`
      ctx.arc(0, 0, sr + width / 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      ctx.fillStyle = '#333'
      ctx.font = 'small-caps bold 24px/1 sans-serif'

      const minutes = Math.floor((secondsRemaining + 1) / 60)
      const seconds = Math.floor((secondsRemaining + 1) % 60)

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const sec = seconds === 0 ? '00' : seconds
      ctx.fillText(`${minutes}:${sec}`, width / 2, height / 2)
      document.title = `[${minutes}:${sec}] remaining!!`
    }

    const ctx = canvasRef.current.getContext('2d')

    const interval = setInterval(() => {
      draw()
    }, 1000 / 15)

    return () => {
      clearInterval(interval)
    }
  }, [canvasRef, width, height, jam.started_at, jam.time_limit])

  return <canvas ref={canvasRef} />
}
