import React, { useState } from "react"
import { Espaco } from "../../../types/interface"
import Input from "../../Input/Input"

export default function CaracteristicasForm(): React.JSX.Element {
    const [espacoCaracteristicas, setEspacoCaracteristicas] = useState<Espaco>()

    return (
        <>
            <div className='grid grid-cols-2 gap-x-4 scale-98'>
                <Input
                    inputType="text"
                    inputLabel="Nome do Espaço"
                    className="col-span-2"
                />
                <Input
                    inputType="text-longo"
                    inputLabel="Descrição"
                    className="col-span-2"
                />
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