import { FormEvent, useCallback, useState } from "react"
import { FeedbackTypeKeys, feedbackTypes } from ".."
import { ScreenshotCamera } from "../../ScreenshotCamera"

interface FeedbackContentStepProps {
  feedbackType: FeedbackTypeKeys,
  onFeedbackSent(): void
}

export function FeedbackContentStep({ feedbackType, onFeedbackSent }: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState('')
  const [comment, setComment] = useState('')

  const feedbackInfo = feedbackTypes[feedbackType]

  const _handleSendFeedback = useCallback((event: FormEvent) => {
    event.preventDefault()

    console.log({ comment, screenshot })

    onFeedbackSent()
  }, [comment, screenshot])

  return (
    <>
      <header>
        <feedbackInfo.Icon size={20} />
        <span className='title'>{feedbackInfo.name}</span>
      </header>
      <form onSubmit={_handleSendFeedback} className='my-4 w-full'>
        <textarea
          required
          className={`
            min-w-[384px] w-full min-h-[112px] text-sm
            placeholder-zinc-400 border border-zinc-600 bg-transparent
            rounded-md resize-none focus:ring-1 focus:ring-brand-500
            scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
          `}
          placeholder='Conte com detalhes o que está acontecendo ...'
          onChange={event => setComment(event.target.value)}
        ></textarea>

        <footer className='flex gap-2 mt-2'>
          <ScreenshotCamera screenshot={screenshot} onScreenshotTook={setScreenshot} />
          <button type='submit'
            disabled={!comment}
            className={`
              focus_ring button
              bg-brand-500 hover:bg-brand-300 disabled:opacity-80 disabled:hover:bg-brand-500
            `}
          >Enviar feedback</button>
        </footer>
      </form>
    </>
  )
}
