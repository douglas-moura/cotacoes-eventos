import React, { useState } from "react"
import { Espaco } from "../../../types/interface"
import Input from "../../Input/Input"

export default function InfraestruturaForm(): React.JSX.Element {
    const [espacoCaracteristicas, setEspacoCaracteristicas] = useState<Espaco>()

    return (
        <>
            <div className='grid grid-cols-3 gap-y-2 gap-x-8 scale-98'>
                <Input
                    inputType="toggle"
                    inputLabel="Elevador"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Acessibilidade"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Wi-Fi"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Estacionamento"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Ar-condicionado"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Espaço kids"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Varanda"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Jardim"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Mesas de Escritório"
                    className="input-toggle"
                />        
                <Input
                    inputType="toggle"
                    inputLabel="Área coberta"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Área externa"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Telão e Projetor"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Portaria / recepção"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Depósito / almoxarifado"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Cozinha equipada"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Espaço pet friendlya"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Área instagramávela"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Piscina"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Churrasqueira"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Serviço de buffet"
                    className="input-toggle"
                />
                <Input
                    inputType="toggle"
                    inputLabel="Sistema de som básico"
                    className="input-toggle"
                />
            </div>
        </>
    )
}