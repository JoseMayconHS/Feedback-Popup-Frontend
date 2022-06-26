import { FormEvent, useCallback, useState } from "react"
import { FeedbackTypeKeys, feedbackTypes } from ".."
import { API, API_ENDPOINTERS } from "../../../services/api"
import { LoadingHOC } from "../../LoadingHOC"
import { ScreenshotCamera } from "../../ScreenshotCamera"

interface FeedbackContentStepProps {
  feedbackType: FeedbackTypeKeys,
  onFeedbackSent(): void
}

export function FeedbackContentStep({ feedbackType, onFeedbackSent }: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState('')
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackInfo = feedbackTypes[feedbackType]

  const _handleSendFeedback = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    try {
      setIsSendingFeedback(() => true)

      await API.post(API_ENDPOINTERS.POST.feedback, {
        type: feedbackInfo.name,
        comment,
        screenshot
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsSendingFeedback(() => false)
      onFeedbackSent()
    }
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
            scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
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
          >
            <LoadingHOC Component={() => <>Enviar feedback</>} loading={isSendingFeedback} />
          </button>
        </footer>
      </form>
    </>
  )
}
