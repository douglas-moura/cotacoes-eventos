import React from "react"
import './Botao.css'

export default function Botao({ texto, tipo }: { texto: string, tipo?: string }): React.JSX.Element {
    let tipoBotao = tipo || "botao-default"
    
    switch (tipo) {
        case "primario": 
            tipoBotao = "botao-primario"
            break
        case "secundario":
            tipoBotao = "botao-secundario"
            break
        case "block":
            tipoBotao = "botao-block"
            break
        default:
            tipoBotao = "botao-default"
    }
    return (
        <button type="button" className={[tipoBotao, "botao"].join(' ')}>
            {texto}
        </button>
    )
}