import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { QuestionContext } from '../contexts/QuestionContext'

interface QuestionProps {
  question: string
  questionId: number
}

function Question({ question, questionId, ...rest}: QuestionProps) {
  const { getQuestionAnswer } = useContext(QuestionContext)
  const regexp = /^[0-9\b]+$/

  const [answer, setAnswer] = useState(1)

  function handleInput(e: ChangeEvent<HTMLInputElement>) {

    let value = e.currentTarget.value

    if (value === '' || regexp.test(value)) {
      setAnswer(+value)
    }
    return undefined
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (questionId !== 0) {
      getQuestionAnswer(questionId, answer)
    } else {
      console.log('a')
    }
  }

  return (
    <div className="question">
      <form onSubmit={handleSubmit}>
        <label htmlFor={`resposta_${questionId}`} >
          {question}
        </label>
        <input
          type="number"
          name={`resposta_${questionId}`}
          id={`resposta_${questionId}`}
          value={answer}
          min={2}
          max={8000}
          onChange={handleInput}
        />

        <button type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Question