import React, { useEffect, useState } from "react"
import { EspacoCaracteristicasProps } from "../../../types/type"
import Input from "../../Input/Input"

type Props = {
    enviarDados: (valor: EspacoCaracteristicasProps) => void
}

export default function CaracteristicasForm({ enviarDados }: Props): React.JSX.Element {
    const [caracteristicas, setCaracteristicas] = useState<EspacoCaracteristicasProps>({
        nome: '',
        descricao: '',
        area: 0,
        capacidade: 0,
        ambientes: 0,
        banheiros: 0
    })
    
    useEffect(() => mandarDadosCompPai(), [caracteristicas])

    const mandarDadosCompPai = () => enviarDados(caracteristicas)

    return (
        <>
            <div className="espaco-form-subform grid-cols-2">
                <Input
                    inputType="text"
                    inputLabel="Nome do Espaço"
                    className="col-span-2"
                    value={caracteristicas.nome}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, nome: value })}
                />
                <span className="col-span-2 mb-4">
                    <Input
                        inputType="text-longo"
                        inputLabel="Descrição"
                        value={caracteristicas.descricao}
                        onChange={(value) => setCaracteristicas({ ...caracteristicas, descricao: value })}
                    />
                    <p className='text-[.5rem] w-full text-left -mt-2'>{500 - caracteristicas.descricao.length} caracteres</p>
                </span>
                <Input
                    inputType="number"
                    inputLabel="Área (m²)"
                    value={caracteristicas.area}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, area: parseInt(value) })}
                />
                <Input
                    inputType="number"
                    inputLabel="Capacidade (pessoas)"
                    value={caracteristicas.capacidade}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, capacidade: parseInt(value) })}
                />
                <Input
                    inputType="number"
                    inputLabel="Qtd. Ambientes"
                    value={caracteristicas.ambientes}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, ambientes: parseInt(value) })}
                />
                <Input
                    inputType="number"
                    inputLabel="Qtd. Banheiros"
                    value={caracteristicas.banheiros}
                    onChange={(value) => setCaracteristicas({ ...caracteristicas, banheiros: parseInt(value) })}
                />
            </div>
        </>
    )
}