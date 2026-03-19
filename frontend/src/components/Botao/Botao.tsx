import React from "react"
import { Icon } from "@iconify/react"
import './Botao.css'

export default function Botao({ texto, tipo, icone, onClick }: { texto: string, tipo?: string, icone?: string, onClick?: () => void }): React.JSX.Element {
    let tipoBotao = tipo || "botao-default"
    
    switch (tipo) {
        case "primario": 
            tipoBotao = "botao-primario"
            break
        case "secundario":
            tipoBotao = "botao-secundario"
            break
        case "outline":
            tipoBotao = "botao-outline"
            break
        case "cancel":
            tipoBotao = "botao-cancelar"
            break
        case "block":
            tipoBotao = "botao-block"
            break
        default:
            tipoBotao = "botao-default"
    }

    return (
        <button type="submit" onClick={onClick} className={[tipoBotao, "botao"].join(' ')}>
            {icone && icone?.length > 0 ? <Icon icon={icone} className="mr-2 text-2xl leading-0" /> : null }
            {texto}
        </button>
    )
}