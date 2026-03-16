import React, { useState } from "react"
import { Espaco } from "../../../types/interface"
import Input from "../../Input/Input"

export default function CaracteristicasForm(): React.JSX.Element {
    const [espacoCaracteristicas, setEspacoCaracteristicas] = useState<Espaco>()
    const [descr, setDescr] = useState<string>('')

    return (
        <>
            <div className='grid grid-cols-2 gap-x-4 scale-95'>
                <Input
                    inputType="text"
                    inputLabel="Nome do Espaço"
                    className="col-span-2"
                />
                <span className="col-span-2 mb-4">
                    <Input
                        inputType="text-longo"
                        inputLabel="Descrição"
                        value={descr}
                        onChange={(value) => setDescr(value)}
                    />
                    <p className='text-[.5rem] w-full text-left -mt-2'>{500 - descr.length} caracteres</p>
                </span>
                <Input
                    inputType="number"
                    inputLabel="Área (m²)"
                />
                <Input
                    inputType="number"
                    inputLabel="Capacidade"
                />
                <Input
                    inputType="number"
                    inputLabel="Ambientes"
                />
                <Input
                    inputType="number"
                    inputLabel="Banheiros"
                />
            </div>
        </>
    )
}