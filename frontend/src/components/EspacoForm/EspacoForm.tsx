import React, { useEffect, useState } from "react"
import { Endereco, Espaco, FormEventoEstado, Infra } from "../../types/interface"
import { Icon } from "@iconify/react"
import { EspacoCaracteristicasProps } from "../../types/type"
import { getInfraestruturas } from "../../functions/getInfraestruturas"
import { cadastrarEspaco } from "../../functions/cadastrarEspaco"
import Botao from "../Botao/Botao"
import CaracteristicasForm from "./Forms/CaracteristicasForm"
import EnderecoForm from "./Forms/EnderecoForm"
import InfraestruturaForm from "./Forms/InfraestruturaForm"
import BoxConteudo from "../BoxConteudo/BoxConteudo"
import validate from "../../functions/validate"
import IconeInfraestrutura from "../IconeInfraestrutura/IconeInfraestrutura"
import './EspacoForm.css'

type Props = {
    enviarDados: (valor: boolean) => void
}

export default function EspacoForm({ enviarDados }: Props): React.JSX.Element {
    const [formCaract, setFormCaract] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-0"})
    const [formEndereco, setFormEndereco] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [formInfra, setFormInfra] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [infraOpcoesGeral, setInfraOpcoesGeral] = useState<Infra[]>([])
    const [espaco, setEspaco] = useState<Espaco>({
        id: 0,
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
            cep: '',
        },

        infraestruturas: [],

        proprietarioID: 0,

        ativo: true,
        visivel: true
    })

    // efeito de transição de formulários
    useEffect(() => {
        if (formCaract.finalizado) {
            setFormCaract({ ...formCaract, estilo: '-translate-x-full' })
            setFormEndereco({ ...formEndereco, estilo: "translate-x-0"})
            setTimeout(() => setFormCaract({ ...formCaract, estilo: '!hidden' }), 200)
        }

        if (formEndereco.finalizado) {
            setFormEndereco({ ...formEndereco, estilo: '-translate-x-full' })
            setFormInfra({ ...formInfra, estilo: "translate-x-0"})
            setTimeout(() => setFormEndereco({ ...formEndereco, estilo: '!hidden' }), 200);
        }

        if (formInfra.finalizado) {}
    }, [formCaract.finalizado, formEndereco.finalizado, formInfra.finalizado])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInfraestruturas()
            setInfraOpcoesGeral(data)
        }

        fetchData()
    }, [])

    // função para ativar a troca de formulário
    const avancarEtapa = () => {
        if (!formCaract.finalizado) {
            if (
                espaco.nome.length > 0 &&
                espaco.descricao.length > 0 &&
                espaco.area > 0 &&
                espaco.capacidade > 0 &&
                espaco.ambientes > 0 &&
                espaco.quantidadeBanheiros > 0
            ) {
                setFormCaract({ ...formCaract, finalizado: true })
            } else {
                setFormCaract({ ...formCaract, status: false })
            }
        }

        if (!formEndereco.finalizado && formCaract.finalizado) {
            if (
                espaco.endereco.rua.length > 0 &&
                espaco.endereco.numero.length > 0 &&
                validate({tipo: 'cep', valor: espaco.endereco.cep}) &&
                espaco.endereco.bairro.length > 0 &&
                espaco.endereco.cidade.length > 0 &&
                espaco.endereco.uf.length > 0
            ) {
                setFormEndereco({ ...formEndereco, finalizado: true })
            } else {
                setFormEndereco({ ...formEndereco, status: false })
            }
        }

        if (!formInfra.finalizado && formEndereco.finalizado) {
            setFormInfra({ ...formInfra, finalizado: true })
            cadastrarEspaco(espaco)
            resultadoForm(true)
        }
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
    const receberDadosInfraestrutura = (dado: Infra[]) => {
        setEspaco({ ...espaco, infraestruturas: dado })
    }

    const resultadoForm = (result: boolean) => {
        enviarDados(result)
    }

    return (
        <section>
            <div className="container grid-cols-2 !gap-16">
                <div className="coluna">
                    <h1>Cadastrar Espaço</h1>
                    <form id='espaco-form' className="" onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <span className="espaco-form-container">
                            <span className={["", formCaract?.estilo].join(' ')}>
                                <CaracteristicasForm
                                    statusForm={formCaract.status ?? true}
                                    enviarDados={receberDadosCaracteristicas}
                                />
                            </span>
                            <span className={["", formEndereco?.estilo].join(' ')}>
                                <EnderecoForm
                                    statusForm={formEndereco.status ?? true}
                                    enviarDados={receberDadosEndereco}
                                />
                            </span>
                            <span className={["", formInfra?.estilo].join(' ')}>
                                <InfraestruturaForm
                                    enviarDados={receberDadosInfraestrutura}
                                />
                            </span>
                        </span>
                        <span className="!flex-row w-full justify-between mt-4">
                            <span className="w-1/4">
                                <Botao
                                    tipo="cancel"
                                    texto="Cancelar"
                                    onClick={() => resultadoForm(true)}
                                />
                            </span>
                            <span className="w-1/4">
                                <Botao
                                    tipo="primario"
                                    texto="Anterior"
                                    icone={formCaract.finalizado && formEndereco.finalizado ? "" : "mynaui:arrow-left-circle"}
                                />
                            </span>
                            <span className="w-1/4">
                                <Botao
                                    tipo="primario"
                                    texto={formCaract.finalizado && formEndereco.finalizado ? "Finalizar" : "Próximo"}
                                    icone={formCaract.finalizado && formEndereco.finalizado ? "" : "mynaui:arrow-right-circle"}
                                    onClick={() => avancarEtapa()}
                                />
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
                            <p>{espaco.area ? espaco.area : 0}</p>
                        </span>
                        <span>
                            <strong className="">Capacidade</strong>
                            <p>{espaco.capacidade ? espaco.capacidade : 0}</p>
                        </span>
                        <span>
                            <strong className="">Ambientes</strong>
                            <p>{espaco.ambientes ? espaco.ambientes : 0}</p>
                        </span>
                        <span>
                            <strong className="">Banheiros</strong>
                            <p>{espaco.quantidadeBanheiros ? espaco.quantidadeBanheiros : 0}</p>
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
                            {infraOpcoesGeral?.map((item) => {
                                const ativo = espaco.infraestruturas?.find(i => i.infra_id === item.id) ? true : false                                
                                return <IconeInfraestrutura item={item} ativo={ativo} />
                            })}
                        </div>
                    </div>
                </BoxConteudo>
            </div>
        </section>
    )
}