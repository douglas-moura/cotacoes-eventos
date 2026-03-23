import React, { useState, useEffect } from "react"
import { getInfraestruturas } from "../../functions/getInfraestruturas"
import { Infra } from "../../types/interface"
import Input from "../Input/Input"

type Props = {
    infosEdit: Infra[] | undefined,
    enviarDados: (valor: Infra[]) => void
}

export default function InfraestruturaForm({ infosEdit, enviarDados }: Props): React.JSX.Element {
    const [infraLista, setInfraLista] = useState<Infra[]>([])
    const [infraOpcoesGeral, setInfraOpcoesGeral] = useState<Infra[]>([])

    useEffect(() => {
        if (infosEdit && infosEdit?.length > 0 && infraLista.length === 0) {
            setInfraLista(infosEdit)
        }
    }, [infosEdit])

    useEffect(() => {
        enviarDados(infraLista)
    }, [infraLista])
    
    useEffect(() => {            
        const fetchData = async () => {
            const data = await getInfraestruturas()
            setInfraOpcoesGeral(data)
        }
        
        fetchData()
    }, [])
    
    return (
        <>
            <div className="espaco-form-subform grid-cols-2">
                {infraOpcoesGeral.length > 0 && (
                    infraOpcoesGeral.map((item) => {
                        return <Input
                            key={item.titulo}
                            inputType="toggle"
                            inputLabel={item.titulo}
                            className="input-toggle"
                            check={infraLista.some(i => i.infra_id === Number(item.id))}
                            onChange={(value) => {                            
                                setInfraLista(
                                    prev => value ? 
                                        [...prev, { infra_id: Number(item.id) }] :
                                        prev.filter(i => i.infra_id !== Number(item.id))
                                )}
                            }
                        />
                    })
                )}
           </div>
        </>
    )
}