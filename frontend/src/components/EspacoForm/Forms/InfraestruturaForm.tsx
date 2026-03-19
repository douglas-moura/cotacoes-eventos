import React, { useState, useEffect } from "react"
import { getInfraestruturas } from "../../../functions/getInfraestruturas"
import { Infra } from "../../../types/interface"
import Input from "../../Input/Input"

type Props = {
    enviarDados: (valor: number[]) => void
}

export default function InfraestruturaForm({ enviarDados }: Props): React.JSX.Element {
    const [infraLista, setInfraLista] = useState<number[]>([])
    const [infraOpcoesGeral, setInfraOpcoesGeral] = useState<Infra[]>([])
    
    useEffect(() => mandarDadosCompPai(), [infraLista])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInfraestruturas()
            setInfraOpcoesGeral(data)
        }

        fetchData()
    }, [])

    const mandarDadosCompPai = () => enviarDados(infraLista)

    return (
        <>
            <div className="espaco-form-subform grid-cols-2">
                {infraOpcoesGeral.map((item) => (
                    <Input
                        key={item.id}
                        inputType="toggle"
                        inputLabel={item.titulo}
                        className="input-toggle"
                        onChange={(value) => setInfraLista(prev => value ? [...prev, item.id] : prev.filter(i => i !== item.id))}
                    />
                ))}
           </div>
        </>
    )
}