import React from "react"
import { ToggleInputProps } from "../../types/type"
import "./Input.css"

export default function ToggleInput({ check }: ToggleInputProps): React.JSX.Element {
    return (
        <div className={[`transition-all duration-200 ease-out h-[1.5rem] min-w-[2.5rem] flex flex-row bg-neutral-200 rounded-full p-1 ${check ? '!justify-end !bg-[var(--color-primaria-light)]' : '!justify-start'}`].join(' ')}>
            <div className={[`transition-all duration-200 ease-out h-full aspect-square rounded-full ${check ? 'bg-[var(--color-primaria)]' : 'bg-neutral-300'}`].join(' ')}></div>
        </div>
    )
}