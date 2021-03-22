import React, { ButtonHTMLAttributes } from 'react'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

function ActionButton({ text, ...rest }: ActionButtonProps) {
    return (
        <button {...rest}>
            {text}
        </button>
    )
}

export default ActionButton