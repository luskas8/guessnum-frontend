import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { QuestionContext, Question as QuestionContextProps } from '../contexts/QuestionContext'

interface QuestionProps {
  question: QuestionContextProps
}

function Question({ question, ...rest}: QuestionProps) {
  const { getQuestionAnswer, changeQuestion } = useContext(QuestionContext)
  const regexp = /^[0-9\b]+$/

  const [answer, setAnswer] = useState(question.value)

  function handleInput(e: ChangeEvent<HTMLInputElement>) {

    let value = e.currentTarget.value

    if (value === '' || regexp.test(value)) {
      setAnswer(+value)
    }
    return undefined
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    getQuestionAnswer(question.id, answer).then(() => {
      changeQuestion()
      setAnswer(question.value)
    })
  }

  return (
    <div className="question">
      <form onSubmit={handleSubmit}>
        <label htmlFor={`resposta_${question.id}`} >
          {question.text}
        </label>
        {
          (question.id !== 0) && (
          <>
            <input
              type="number"
              name={`resposta_${question.id}`}
              id={`resposta_${question.id}`}
              value={answer}
              min={1}
              max={8000}
              onChange={handleInput}
            />

            <button type="submit">
              Enviar
            </button>
          </>
          )
        }
      </form>
    </div>
  )
}

export default Question