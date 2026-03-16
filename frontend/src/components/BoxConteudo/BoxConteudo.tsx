import React from "react"
import { BoxConteudoProps } from "../../types/type"
import './BoxConteudo.css'

export default function BoxConteudo({ children, className = "" }: BoxConteudoProps): React.JSX.Element {
    return (
        <div className={`coluna box-conteudo ${className}`}>
            {children}
        </div>
    )
}