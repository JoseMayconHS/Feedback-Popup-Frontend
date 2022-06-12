import { useCallback, useState } from 'react'
import { Lightbulb, Bug, Asterisk, ArrowLeft, Heart } from 'phosphor-react'

import { WidgetClose } from "../WidgetClose"

import { FeedbackTypesStep } from './Steps/FeedbackTypesStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'

import './index.css'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'

export const feedbackTypes = {
  BUG: {
    name: 'Problema',
    Icon: Bug
  },
  IDEA: {
    name: 'Ideia',
    Icon: Lightbulb
  },
  OTHER: {
    name: 'Outros',
    Icon: Asterisk,
  }
}

export type FeedbackTypeKeys = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypeKeys | null>()
  const [feedbackSent, setFeedbackSent] = useState(false)

  const _handleReset = useCallback(() => {
    setFeedbackSent(() => false)
    setFeedbackType(() => null)
  }, [])

  return (
    <div className={`
    bg-zinc-900 p-4 relative rounded-2xl flex flex-col items-center mb-4 shadow-lg
      w-[calc(100vw-2rem)] md:w-auto
    `}>
      {
        (feedbackType && !feedbackSent) && (
          <button
            className={`
              absolute top-5 left-5 text-zinc-400 hove:text-zinc-100
            `}
            title='Voltar'
            onClick={_handleReset}
          >
            <ArrowLeft className='w-4 h-4' weight='bold' />
          </button>
        )
      }
      <WidgetClose />

      {
        feedbackSent ? (
          <FeedbackSuccessStep _handleBack={_handleReset} />
        ) : (
          <>
            {
              !feedbackType ? (
                <FeedbackTypesStep onFeedbackSelect={setFeedbackType} />
              ) : (
                <FeedbackContentStep feedbackType={feedbackType} onFeedbackSent={() => setFeedbackSent(true)} />
              )
            }
          </>
        )
      }

      <footer className={`
        text-xs text-neutral-400 w-full
        flex flex-nowrap justify-center items-center gap-2
      `}>
        <p>Feito com </p>
        <Heart color='red' fill='red' weight='fill' />
      </footer>
    </div>
  )
}
