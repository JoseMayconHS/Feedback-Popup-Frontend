import { useCallback, useState } from "react"
import html2canvas from "html2canvas"
import { Camera, Trash } from "phosphor-react"

import { LoadingHOC } from "./LoadingHOC"

interface ScreenshotCameraProps {
  screenshot: string,
  onScreenshotTook(base64Image: string): void
}

export function ScreenshotCamera({ screenshot, onScreenshotTook }: ScreenshotCameraProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  const _handleScreenshot = useCallback(async () => {
    setIsTakingScreenshot(() => true)
    const canvas = await html2canvas(document.querySelector('html')!)

    onScreenshotTook(canvas.toDataURL('image/png'))

    setIsTakingScreenshot(() => false)
  }, [])

  if (screenshot) {
    return (
      <button
        type='button'
        className={`
          focus_ring p-1 w-10 h-10 rounded-md flex items-end justify-end text-zinc-400 hover:text-zinc-100
        `}
        style={{
          backgroundImage: `url(${screenshot})`
        }}
        onClick={() => onScreenshotTook('')}
      >
        <Trash weight='fill' />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={_handleScreenshot}
      className={`
        focus_ring rounded-md p-2 bg-zinc-800 border-transparent hover:bg-zinc-700
        w-10 h-10 flex items-center justify-center
      `}
    >
      <LoadingHOC
        Component={() => <Camera className="w-6 h-6" />}
        loading={isTakingScreenshot}
      />
    </button>
  );
}
