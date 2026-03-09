import React from "react"
import { Icon } from "@iconify/react"
import './BoxMensagem.css'

export default function BoxMensagem({tipo, msg}: {tipo: string, msg: string}): React.JSX.Element {
    let iconName: string = ''

    switch (tipo) {
        case 'alerta':
            iconName = 'mdi:alert-outline'
            break
        case 'erro':
            iconName = 'mdi:error-outline'
            break
        case 'sucesso':
            iconName = "mdi:check-circle-outline"
            break
        default:
            iconName = 'mdi:comment-question-outline'
            break
    }

    return (
        <div className={`box-mensagem-container box-mensagem-${tipo}`}>
            <Icon icon={iconName} width="18" className="box-mensagem-icon" />
            <p>{msg}</p>
        </div>
    )
}