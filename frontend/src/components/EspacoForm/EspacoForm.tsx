import React, { useEffect, useState } from "react"
import { Endereco, Espaco, FormEventoEstado } from "../../types/interface"
import { Icon } from "@iconify/react"
import { EspacoCaracteristicasProps } from "../../types/type"
import { infraOpcoes } from "../../functions/infrasOpcoes"
import Botao from "../Botao/Botao"
import CaracteristicasForm from "./Forms/CaracteristicasForm"
import EnderecoForm from "./Forms/EnderecoForm"
import InfraestruturaForm from "./Forms/InfraestruturaForm"
import BoxConteudo from "../BoxConteudo/BoxConteudo"
import './EspacoForm.css'

export default function EspacoForm(): React.JSX.Element {
    const [formCaract, setFormCaract] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-0"})
    const [formEndereco, setFormEndereco] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [formInfra, setFormInfra] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})

    const [espaco, setEspaco] = useState<Espaco>({
        nome: '',
        descricao: '',
        
        area: 0,
        capacidade: 0,
        ambientes: 0,
        quantidadeBanheiros: 0,

        endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
            cep: 0,
        },

        infraestrutura: [],

        proprietario: {
            nome: "Douglas",
            email: "douglas@email.com",
            senha: "12345",
        },

        ativo: true
    })

    // efeito de transição de formulários
    useEffect(() => {
        if (formCaract.finalizado) {
            setFormCaract({ ...formCaract, estilo: '-translate-x-full' })
            setFormEndereco({ ...formEndereco, estilo: "translate-x-0"})
            setTimeout(() => setFormCaract({ ...formCaract, estilo: '!hidden' }), 200);
        }

        if (formEndereco.finalizado) {
            setFormEndereco({ ...formEndereco, estilo: '-translate-x-full' })
            setFormInfra({ ...formInfra, estilo: "translate-x-0"})
            setTimeout(() => setFormEndereco({ ...formEndereco, estilo: '!hidden' }), 200);
        }

        if (formInfra.finalizado) {
            console.log('Finalizado')
        }
    }, [formCaract. finalizado, formEndereco.finalizado, formInfra.finalizado])

    // função para ativar a troca de formulário
    const avancarEtapa = () => {
        if (!formCaract.finalizado) setFormCaract({ ...formCaract, finalizado: true })
        if (!formEndereco.finalizado && formCaract.finalizado) setFormEndereco({ ...formEndereco, finalizado: true })
        if (!formInfra.finalizado && formEndereco.finalizado) setFormInfra({ ...formInfra, finalizado: true })
    }
    
    // receber dados do subformulario de caracteristicas
    const receberDadosCaracteristicas = (dado: EspacoCaracteristicasProps) => {
        setEspaco({
            ...espaco,
            nome: dado.nome,
            descricao: dado.descricao,
            area: dado.area,
            capacidade: dado.capacidade,
            ambientes: dado.ambientes,
            quantidadeBanheiros: dado.banheiros
        })
    }
    
    // receber dados do subformulario de endereco
    const receberDadosEndereco = (dado: Endereco) => {
        setEspaco(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                rua: dado.rua,
                numero: dado.numero,
                complemento: dado.complemento,
                referencia: dado.referencia,
                bairro: dado.bairro,
                cidade: dado.cidade,
                uf: dado.uf,
                cep: dado.cep
            }
        }))
    }
    
    // receber dados do subformulario de infraestrutura
    const receberDadosInfraestrutura = (dado: string[]) => {
        setEspaco({ ...espaco, infraestrutura: dado })            
    }

    return (
        <section>
            <div className="container grid-cols-2 !gap-16">
                <div className="coluna">
                    <h1>Cadastrar Espaço</h1>
                    <form id='espaco-form' className="" onSubmit={(e) => {
                        e.preventDefault()
                        //cadastrarEspaco()
                    }}>
                        <span className="espaco-form-container">
                            <span className={["", formCaract?.estilo].join(' ')}>
                                <CaracteristicasForm enviarDados={receberDadosCaracteristicas} />
                            </span>
                            <span className={["", formEndereco?.estilo].join(' ')}>
                                <EnderecoForm enviarDados={receberDadosEndereco} />
                            </span>
                            <span className={["", formInfra?.estilo].join(' ')}>
                                <InfraestruturaForm enviarDados={receberDadosInfraestrutura} />
                            </span>
                        </span>
                        <span className="!flex-row w-full justify-end mt-4">
                            <span className="w-1/3">
                                <Botao tipo="primario" texto={formCaract?.finalizado && formEndereco?.finalizado ? "Finalizar" : "Próximo"} icone={formCaract?.finalizado && formEndereco?.finalizado ? "" : "mynaui:arrow-right-circle"} onClick={() => avancarEtapa()} />
                            </span>
                        </span>
                    </form>
                </div>
                <BoxConteudo>
                    <div className="mb-6">
                        <h3>{espaco.nome || 'Nome do Espaço'}</h3>
                        <p className="wrap-break-word text-xs text-neutral-400">{espaco.descricao || 'Descrição do espaço'}</p>
                    </div>
                    <div className="espaco-form-resumo-caract">
                        <span>
                            <strong className="">Área (m²)</strong>
                            <p>{espaco.area}</p>
                        </span>
                        <span>
                            <strong className="">Capacidade</strong>
                            <p>{espaco.capacidade}</p>
                        </span>
                        <span>
                            <strong className="">Ambientes</strong>
                            <p>{espaco.ambientes}</p>
                        </span>
                        <span>
                            <strong className="">Banheiros</strong>
                            <p>{espaco.quantidadeBanheiros}</p>
                        </span>
                    </div>
                    <div className="espaco-form-resumo-endereco">
                        <h4 className="font-extrabold mb-2">Endereço</h4>
                        <p>{espaco.endereco?.rua || null} {espaco.endereco?.numero ? ', ' + espaco.endereco.numero : ''} {espaco.endereco?.complemento} </p>
                        <p>{espaco.endereco?.referencia ? espaco.endereco?.referencia : null}</p>
                        <p>{espaco.endereco?.cep ? 'CEP ' + espaco.endereco.cep : null} {espaco.endereco?.bairro ? ' - ' + espaco.endereco.bairro : null}</p>
                        <p>{espaco.endereco?.cidade ? espaco.endereco.cidade : ''} {espaco.endereco?.uf ? ' - ' + espaco.endereco.uf : ''}</p>
                    </div>
                    <div className="espaco-form-resumo-infra">
                        <h4 className="font-extrabold mb-4">Infraestrutura</h4>
                        <div className="grid grid-cols-7 gap-2">
                            {infraOpcoes?.map((item) => {
                                const ativo = espaco.infraestrutura?.find(i => i === item.titulo)

                                return (
                                    <span key={item.titulo} className={['espaco-form-resumo-infra-item', ativo ? 'scale-100 opacity-100' : 'scale-50 opacity-0 absolute'].join(' ')}>
                                        <Icon icon={item?.icone || "teste"} className="text-2xl text-[var(--color-primaria-escuro)]" />
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </BoxConteudo>
            </div>
        </section>
    )
}