import React, { ButtonHTMLAttributes, useContext } from 'react'
import { QuestionContext } from '../contexts/QuestionContext'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

function ActionButton({ text, ...rest }: ActionButtonProps) {
    const { swithRange } = useContext(QuestionContext)

    return (
        <button {...rest} onClick={evt => swithRange(evt.currentTarget.value)} >
            {text}
        </button>
    )
}

export default ActionButton