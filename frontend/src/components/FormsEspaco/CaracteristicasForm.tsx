import React, { useEffect, useState } from "react"
import { EspacoCaracteristicasProps } from "../../types/type"
import Input from "../Input/Input"

type Props = {
    enviarDados: (valor: EspacoCaracteristicasProps) => void
    statusForm: boolean,
    infosEdit: {
        nome: string,
        descricao: string,
        area: number,
        capacidade: number,
        ambientes: number,
        banheiros: number
    },
}

export default function CaracteristicasForm({ infosEdit, statusForm, enviarDados }: Props): React.JSX.Element {
    const [caracteristicas, setCaracteristicas] = useState<EspacoCaracteristicasProps>({
        status: statusForm,
        nome: '',
        descricao: '',
        area: 0,
        capacidade: 0,
        ambientes: 0,
        banheiros: 0
    })
    
    useEffect(() => {
        enviarDados(caracteristicas)
    }, [caracteristicas])

    useEffect(() => {
        setCaracteristicas(prev => ({
            ...prev,
            status: statusForm
        }))

        setCaracteristicas({ ...caracteristicas, nome: caracteristicas.nome.toUpperCase()})
    }, [statusForm, caracteristicas.nome])

    useEffect(() => {
        if (infosEdit && infosEdit.nome.length > 0) {
            setCaracteristicas(prev => ({
                ...prev,
                ...infosEdit
            }))
        }
    }, [JSON.stringify(infosEdit)])

    return (
        <>
            <div className="espaco-form-subform grid-cols-2">
                <Input
                    inputType="text"
                    inputLabel="Nome do Espaço"
                    className="col-span-2"
                    value={caracteristicas.nome}
                    status={!(caracteristicas.nome.length == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas(prev => ({ ...prev, nome: value }))}
                />
                <span className="col-span-2 mb-4">
                    <Input
                        inputType="text-longo"
                        inputLabel="Descrição"
                        value={caracteristicas.descricao}
                        status={!(caracteristicas.descricao.length == 0 && !caracteristicas.status)}
                        onChange={(value) => setCaracteristicas(prev => ({ ...prev, descricao: value }))}
                    />
                    <p className='text-[.5rem] w-full text-left -mt-2'>{500 - caracteristicas.descricao.length} caracteres</p>
                </span>
                <Input
                    inputType="number"
                    inputLabel="Área (m²)"
                    value={caracteristicas.area}
                    status={!(caracteristicas.area == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas(prev => ({ ...prev, area: parseInt(value) }))}
                />
                <Input
                    inputType="number"
                    inputLabel="Capacidade (pessoas)"
                    value={caracteristicas.capacidade}
                    status={!(caracteristicas.capacidade == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas(prev => ({ ...prev, capacidade: parseInt(value) }))}
                />
                <Input
                    inputType="number"
                    inputLabel="Qtd. Ambientes"
                    value={caracteristicas.ambientes}
                    status={!(caracteristicas.ambientes == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas(prev => ({ ...prev, ambientes: parseInt(value) }))}
                />
                <Input
                    inputType="number"
                    inputLabel="Qtd. Banheiros"
                    value={caracteristicas.banheiros}
                    status={!(caracteristicas.banheiros == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas(prev => ({ ...prev, banheiros: parseInt(value) }))}
                />
            </div>
        </>
    )
}