import { FeedbackTypeKeys, feedbackTypes } from ".."

interface FeedbackTypesStepProps {
  onFeedbackSelect(type: FeedbackTypeKeys): void
}

export function FeedbackTypesStep({ onFeedbackSelect }: FeedbackTypesStepProps) {
  return (
    <>
      <header>
        <span className='title'>Deixe seu feedback</span>
      </header>

      <div className='flex py-8 gap-2 w-full'>
        {
          Object
            .entries(feedbackTypes)
            .map(([key, value]) => (
              <button
                key={key}
                onClick={() => onFeedbackSelect(key as FeedbackTypeKeys)}
                className={`
                        bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2
                        border-2 border-transparent
                        hover:border-brand-500 focus:border-brand-500 focus:outline-none
                      `}
              >
                <value.Icon size={27} />
                <span>{value.name}</span>
              </button>
            ))
        }
      </div>
    </>
  )
}
