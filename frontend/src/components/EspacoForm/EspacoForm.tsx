import React, { useEffect, useState } from "react"
import { Espaco, FormEvento } from "../../types/interface"
import Botao from "../Botao/Botao"
import CaracteristicasForm from "./Forms/CaracteristicasForm"
import EnderecoForm from "./Forms/EnderecoForm"
import AcessibilidadesForm from "./Forms/InfraestruturaForm"
import './EspacoForm.css'

export default function EspacoForm(): React.JSX.Element {
    const [formCaract, setFormCaract] = useState<FormEvento>({finalizado: false, estilo: "translate-x-0"})
    const [formEndereco, setFormEndereco] = useState<FormEvento>({finalizado: false, estilo: "translate-x-full"})
    const [formAcess, setFormAcess] = useState<FormEvento>({finalizado: false, estilo: "translate-x-full"})

    const avancarEtapa = () => {
        if (!formCaract.finalizado) setFormCaract({ ...formCaract, finalizado: true })
        
        if (!formEndereco.finalizado && formCaract.finalizado) setFormEndereco({ ...formEndereco, finalizado: true })

        if (!formAcess.finalizado && formEndereco.finalizado) setFormAcess({ ...formAcess, finalizado: true })
    }

    const [espaco, setEspaco] = useState<Espaco>({
        id: 1,
        nome: '',
        proprietario: {
            nome: "Douglas",
            email: "douglas@email.com",
            senha: "12345",
        },
        endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: 'Bahia',
            uf: 'BA',
            cep: 0,
        },
        area: 88,
        capacidade: 100,
        ambientes: 3,
        quantidadeBanheiros: 4,
        quantidadeEntradasSaidas: [2, 2],
        acessibilidade: [true, true],
        ativo: true
    })

    useEffect(() => {
        if (formCaract.finalizado) {
            setFormCaract({ ...formCaract, estilo: '-translate-x-full' })
            setFormEndereco({ ...formEndereco, estilo: "translate-x-0"})
            setTimeout(() => setFormCaract({ ...formCaract, estilo: '!hidden' }), 200);
        }

        if (formEndereco.finalizado) {
            setFormEndereco({ ...formEndereco, estilo: '-translate-x-full' })
            setFormAcess({ ...formAcess, estilo: "translate-x-0"})
            setTimeout(() => setFormEndereco({ ...formEndereco, estilo: '!hidden' }), 200);
        }

        if (formAcess.finalizado) {
            console.log('Finalizado')
        }
    }, [formCaract. finalizado, formEndereco.finalizado, formAcess.finalizado])

    return (
        <form id='espaco-form' className="" onSubmit={(e) => {
            e.preventDefault()
            //cadastrarEspaco()
        }}>
            <span className="espaco-form-container">
                <span className={["", formCaract?.estilo].join(' ')}>
                    <CaracteristicasForm />
                </span>
                <span className={["", formEndereco?.estilo].join(' ')}>
                    <EnderecoForm />
                </span>
                <span className={["", formAcess?.estilo].join(' ')}>
                    <AcessibilidadesForm />
                </span>
            </span>
            <span className="!flex-row w-full justify-end mt-4">
                <span className="w-1/3">
                    <Botao tipo="primario" texto={formCaract?.finalizado && formEndereco?.finalizado ? "Finalizar" : "Próximo"} icone={formCaract?.finalizado && formEndereco?.finalizado ? "" : "mynaui:arrow-right-circle"} onClick={() => avancarEtapa()} />
                </span>
            </span>
        </form>
    )
}