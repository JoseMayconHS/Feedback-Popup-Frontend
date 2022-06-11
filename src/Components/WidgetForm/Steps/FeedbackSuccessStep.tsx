import { CheckSquare } from "phosphor-react"

interface FeedbackSuccessStepProps {
  _handleBack(): void
}

export function FeedbackSuccessStep({ _handleBack }: FeedbackSuccessStepProps) {
  return (
    <div className={`
      flex flex-col items-center py-10 w-[304px]
    `}>
      <CheckSquare weight='fill' color='lightgreen' size={60} />
      <span className='text-xl mt-2'>Agradecemos seu feedback!</span>
      <button
        onClick={_handleBack}
        className={`
          focus_ring button
          mt-6 bg-zinc-800 leading-6 text-sm hover:bg-zinc-700 transition-colors
        `}
      >
        Quero enviar outro
      </button>
    </div>
  )
}
