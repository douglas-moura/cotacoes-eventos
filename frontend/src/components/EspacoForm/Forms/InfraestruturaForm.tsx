import React, { useState, useEffect } from "react"
import { infraOpcoes } from "../../../functions/infrasOpcoes"
import Input from "../../Input/Input"

type Props = {
    enviarDados: (valor: string[]) => void
}

export default function InfraestruturaForm({ enviarDados }: Props): React.JSX.Element {
    const [infraLista, setInfraLista] = useState<string[]>([])
    
    useEffect(() => mandarDadosCompPai(), [infraLista])

    const mandarDadosCompPai = () => enviarDados(infraLista)

    return (
        <>
            <div className="espaco-form-subform grid-cols-2">
                {infraOpcoes.map((item) => (
                    <Input
                        inputType="toggle"
                        inputLabel={item.titulo}
                        className="input-toggle"
                        onChange={(value) => setInfraLista(prev => value ? [...prev, item.titulo] : prev.filter(i => i !== item.titulo))}
                    />
                ))}
           </div>
        </>
    )
}