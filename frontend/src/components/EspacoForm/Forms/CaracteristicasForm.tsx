import React, { useEffect, useState } from "react"
import { EspacoCaracteristicasProps } from "../../../types/type"
import Input from "../../Input/Input"

type Props = {
    statusForm: boolean
    enviarDados: (valor: EspacoCaracteristicasProps) => void
}

export default function CaracteristicasForm({ statusForm, enviarDados }: Props): React.JSX.Element {
    const [statusNome, setStatusNome] = useState<boolean>()
    const [statusDescr, setStatusDescr] = useState<boolean>()
    const [statusArea, setStatusArea] = useState<boolean>()
    const [statusCapacidade, setStatusCapacidade] = useState<boolean>()
    const [statusAmbient, setStatusAmbient] = useState<boolean>()
    const [statusBanh, setStatusBanh] = useState<boolean>()

    const [caracteristicas, setCaracteristicas] = useState<EspacoCaracteristicasProps>({
        status: statusForm,
        nome: '',
        descricao: '',
        area: 0,
        capacidade: 0,
        ambientes: 0,
        banheiros: 0
    })
    
    useEffect(() => mandarDadosCompPai(), [caracteristicas])

    useEffect(() => {
        setCaracteristicas(prev => ({
            ...prev,
            status: statusForm
        }))
    }, [statusForm])

    const mandarDadosCompPai = () => enviarDados(caracteristicas)

    return (
        <>
            <div className="espaco-form-subform grid-cols-2">
                <Input
                    inputType="text"
                    inputLabel="Nome do Espaço"
                    className="col-span-2"
                    value={caracteristicas.nome}
                    status={!(caracteristicas.nome.length == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, nome: value })}
                />
                <span className="col-span-2 mb-4">
                    <Input
                        inputType="text-longo"
                        inputLabel="Descrição"
                        value={caracteristicas.descricao}
                        status={!(caracteristicas.descricao.length == 0 && !caracteristicas.status)}
                        onChange={(value) => setCaracteristicas({ ...caracteristicas, descricao: value })}
                    />
                    <p className='text-[.5rem] w-full text-left -mt-2'>{500 - caracteristicas.descricao.length} caracteres</p>
                </span>
                <Input
                    inputType="number"
                    inputLabel="Área (m²)"
                    value={caracteristicas.area}
                    status={!(caracteristicas.area == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, area: parseInt(value) })}
                />
                <Input
                    inputType="number"
                    inputLabel="Capacidade (pessoas)"
                    value={caracteristicas.capacidade}
                    status={!(caracteristicas.capacidade == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, capacidade: parseInt(value) })}
                />
                <Input
                    inputType="number"
                    inputLabel="Qtd. Ambientes"
                    value={caracteristicas.ambientes}
                    status={!(caracteristicas.ambientes == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, ambientes: parseInt(value) })}
                />
                <Input
                    inputType="number"
                    inputLabel="Qtd. Banheiros"
                    value={caracteristicas.banheiros}
                    status={!(caracteristicas.banheiros == 0 && !caracteristicas.status)}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, banheiros: parseInt(value) })}
                />
            </div>
        </>
    )
}