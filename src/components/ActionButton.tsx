import React, { ButtonHTMLAttributes, useContext } from 'react'
import { QuestionContext } from '../contexts/QuestionContext'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

function ActionButton({ text, ...rest }: ActionButtonProps) {
    const { switchRange } = useContext(QuestionContext)

    return (
        <button {...rest} onClick={evt => switchRange(evt.currentTarget.value)} >
            {text}
        </button>
    )
}

export default ActionButton