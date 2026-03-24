import React, { useEffect, useState } from "react"
import { Endereco, Espaco, FormEventoEstado, Infra } from "../types/interface"
import { EspacoCaracteristicasProps } from "../types/type"
import { getInfraestruturas } from "../functions/getInfraestruturas"
import { cadastrarEspaco } from "../functions/cadastrarEspaco"
import { useNavigate, useParams } from "react-router-dom"
import { getEspaco } from "../functions/getEspaco"
import { updateEspaco } from "../functions/updateEspaco"
import Botao from "../components/Botao/Botao"
import CaracteristicasForm from "../components/FormsEspaco/CaracteristicasForm"
import EnderecoForm from "../components/FormsEspaco/EnderecoForm"
import InfraestruturaForm from "../components/FormsEspaco/InfraestruturaForm"
import BoxConteudo from "../components//BoxConteudo/BoxConteudo"
import validate from "../functions/validate"
import IconeInfraestrutura from "../components/IconeInfraestrutura/IconeInfraestrutura"
import './EspacoForm.css'

export default function EspacoForm({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    const { id } = useParams()
    const espacoId = id ? Number(id) : null

    const navigate = useNavigate()
    const [formCaracteristicasStyle, setFormCaracteristicasStyle] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-0"})
    const [formEnderecoStyle, setFormEnderecoStyle] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [formInfraestruturasStyle, setFormInfraestruturasStyle] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [infraOpcoesGeral, setInfraOpcoesGeral] = useState<Infra[]>([])
    const [novoEspaco, setNovoEspaco] = useState<Espaco>({
        id: 0, nome: '', descricao: '',
        area: 0, capacidade: 0, ambientes: 0, quantidadeBanheiros: 0,
        endereco: { rua: '', numero: '', bairro: '', cidade: '', uf: '', cep: '', },
        infraestruturas: [],
        proprietarioID: 0,
        ativo: true, visivel: true
    })
    const [editEspaco, setEditEspaco] = useState<Espaco>({
        id: 0, nome: '', descricao: '',
        area: 0, capacidade: 0, ambientes: 0, quantidadeBanheiros: 0,
        endereco: { rua: '', numero: '', bairro: '', cidade: '', uf: '', cep: '', },
        infraestruturas: [],
        proprietarioID: 0,
        ativo: true, visivel: true
    })

    // busca a lista de infraestruturas no banco ao montar o componente
    useEffect(() => {
        const fetchData = async () => {
            const data = await getInfraestruturas()
            setInfraOpcoesGeral(data)

            if (espacoId && espacoId != 0) {
                const espacoInfos = await getEspaco(espacoId)
                setEditEspaco(espacoInfos)
            }
        }

        fetchData()
    }, [])

    // efeitos de transição de formulários ao mudar as variaveis styles
    useEffect(() => {
        if (formCaracteristicasStyle.finalizado) {
            setFormCaracteristicasStyle({ ...formCaracteristicasStyle, estilo: '-translate-x-full' })
            setFormEnderecoStyle({ ...formEnderecoStyle, estilo: "translate-x-0"})
            setTimeout(() => setFormCaracteristicasStyle({ ...formCaracteristicasStyle, estilo: '!hidden' }), 200)
        }

        if (formEnderecoStyle.finalizado) {
            setFormEnderecoStyle({ ...formEnderecoStyle, estilo: '-translate-x-full' })
            setFormInfraestruturasStyle({ ...formInfraestruturasStyle, estilo: "translate-x-0"})
            setTimeout(() => setFormEnderecoStyle({ ...formEnderecoStyle, estilo: '!hidden' }), 200);
        }

        if (formInfraestruturasStyle.finalizado) {
            navigate('/meus-espacos')
            // incluir cadastro de espaco aqui
        }
    }, [formCaracteristicasStyle.finalizado, formEnderecoStyle.finalizado, formInfraestruturasStyle.finalizado])

    // função para realizar a troca de formulário
    const avancarEtapa = () => {
        if (!formCaracteristicasStyle.finalizado) {
            if (
                novoEspaco.nome.length > 0 &&
                novoEspaco.descricao.length > 0 &&
                novoEspaco.area > 0 &&
                novoEspaco.capacidade > 0 &&
                novoEspaco.ambientes > 0 &&
                novoEspaco.quantidadeBanheiros > 0
            ) {
                setFormCaracteristicasStyle({ ...formCaracteristicasStyle, finalizado: true })
            } else {
                setFormCaracteristicasStyle({ ...formCaracteristicasStyle, status: false })
            }
        }

        if (!formEnderecoStyle.finalizado && formCaracteristicasStyle.finalizado) {
            if (
                validate({tipo: 'cep', valor: novoEspaco.endereco.cep}) &&
                novoEspaco.endereco.rua.length > 0 &&
                novoEspaco.endereco.numero.length > 0 &&
                novoEspaco.endereco.bairro.length > 0 &&
                novoEspaco.endereco.cidade.length > 0 &&
                novoEspaco.endereco.uf.length > 0
            ) {
                setFormEnderecoStyle({ ...formEnderecoStyle, finalizado: true })
            } else {
                setFormEnderecoStyle({ ...formEnderecoStyle, status: false })
            }
        }

        if (!formInfraestruturasStyle.finalizado && formEnderecoStyle.finalizado) {
            setFormInfraestruturasStyle({ ...formInfraestruturasStyle, finalizado: true })
            
            if (editEspaco.nome.length > 0 && editEspaco.descricao.length > 0) {
                updateEspaco(espacoId ?? 0, 'atualizar', novoEspaco)
            } else {
                cadastrarEspaco(novoEspaco)
            }
        }
    }
    
    // receber dados do subformulario de caracteristicas
    const receberDadosCaracteristicas = (dado: EspacoCaracteristicasProps) => {
        setNovoEspaco({
            ...novoEspaco,
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
        setNovoEspaco(prev => ({
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
        setNovoEspaco({ ...novoEspaco, infraestruturas: dado })
    }

    return (
        <main className={['pagina pagina-meus-espacos', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
            <section>
                <div className="container grid-cols-2 !gap-16">
                    <div className="coluna">
                        <h1>Cadastrar Espaço</h1>
                        <form id='espaco-form' className="" onSubmit={(e) => {
                            e.preventDefault()
                        }}>
                            <span className="espaco-form-container">
                                <span className={["w-full", formCaracteristicasStyle?.estilo].join(' ')}>
                                    <CaracteristicasForm
                                        infosEdit={{
                                            nome: editEspaco.nome,
                                            descricao: editEspaco.descricao,
                                            area: editEspaco.area,
                                            capacidade: editEspaco.capacidade,
                                            ambientes: editEspaco.ambientes,
                                            banheiros: editEspaco.quantidadeBanheiros
                                        }}
                                        statusForm={formCaracteristicasStyle.status ?? true}
                                        enviarDados={receberDadosCaracteristicas}
                                    />
                                </span>
                                <span className={["", formEnderecoStyle?.estilo].join(' ')}>
                                    <EnderecoForm
                                        infosEdit={{
                                            rua: editEspaco.endereco.rua,
                                            numero: editEspaco.endereco.numero,
                                            complemento: editEspaco.endereco.complemento,
                                            referencia: editEspaco.endereco.referencia,
                                            bairro: editEspaco.endereco.bairro,
                                            cidade: editEspaco.endereco.cidade,
                                            uf: editEspaco.endereco.uf,
                                            cep: editEspaco.endereco.cep
                                        }}
                                        statusForm={formEnderecoStyle.status ?? true}
                                        enviarDados={receberDadosEndereco}
                                    />
                                </span>
                                <span className={["", formInfraestruturasStyle?.estilo].join(' ')}>
                                    <InfraestruturaForm
                                        infosEdit={editEspaco.infraestruturas}
                                        enviarDados={receberDadosInfraestrutura}
                                    />
                                </span>
                            </span>
                            <span className="flex-row w-full justify-between mt-4">
                                <span className="w-1/4">
                                    <Botao
                                        tipo="cancel"
                                        texto="Cancelar"
                                        onClick={() => navigate("/meus-espacos")}
                                    />
                                </span>
                                <span className="w-1/4">
                                    <Botao
                                        tipo="primario"
                                        texto="Anterior"
                                        icone={formCaracteristicasStyle.finalizado && formEnderecoStyle.finalizado ? "" : "mynaui:arrow-left-circle"}
                                    />
                                </span>
                                <span className="w-1/4">
                                    <Botao
                                        tipo="primario"
                                        texto={formCaracteristicasStyle.finalizado && formEnderecoStyle.finalizado ? "Finalizar" : "Próximo"}
                                        icone={formCaracteristicasStyle.finalizado && formEnderecoStyle.finalizado ? "" : "mynaui:arrow-right-circle"}
                                        onClick={() => avancarEtapa()}
                                    />
                                </span>
                            </span>
                        </form>
                    </div>
                    <BoxConteudo>
                        <div className="mb-6">
                            <h3>{novoEspaco.nome.toUpperCase() || 'Nome do Espaço'}</h3>
                            <p className="wrap-break-word text-xs text-neutral-400">{novoEspaco.descricao || 'Descrição do espaço'}</p>
                        </div>
                        <div className="espaco-form-resumo-caract">
                            <span>
                                <strong className="">Área (m²)</strong>
                                <p>{novoEspaco.area ? novoEspaco.area : 0}</p>
                            </span>
                            <span>
                                <strong className="">Capacidade</strong>
                                <p>{novoEspaco.capacidade ? novoEspaco.capacidade : 0}</p>
                            </span>
                            <span>
                                <strong className="">Ambientes</strong>
                                <p>{novoEspaco.ambientes ? novoEspaco.ambientes : 0}</p>
                            </span>
                            <span>
                                <strong className="">Banheiros</strong>
                                <p>{novoEspaco.quantidadeBanheiros ? novoEspaco.quantidadeBanheiros : 0}</p>
                            </span>
                        </div>
                        <div className="espaco-form-resumo-endereco">
                            <h4 className="font-extrabold mb-2">Endereço</h4>
                            <p>{novoEspaco.endereco?.rua || null} {novoEspaco.endereco?.numero ? ', ' + novoEspaco.endereco.numero : ''} {novoEspaco.endereco?.complemento} </p>
                            <p>{novoEspaco.endereco?.referencia ? novoEspaco.endereco?.referencia : null}</p>
                            <p>{novoEspaco.endereco?.cep ? 'CEP ' + novoEspaco.endereco.cep : null} {novoEspaco.endereco?.bairro ? ' - ' + novoEspaco.endereco.bairro : null}</p>
                            <p>{novoEspaco.endereco?.cidade ? novoEspaco.endereco.cidade : ''} {novoEspaco.endereco?.uf ? ' - ' + novoEspaco.endereco.uf : ''}</p>
                        </div>
                        <div className="espaco-form-resumo-infra">
                            <h4 className="font-extrabold mb-4">Infraestrutura</h4>
                            <div className="grid grid-cols-7 gap-2">
                                {infraOpcoesGeral?.map((item) => {
                                    const ativo = novoEspaco.infraestruturas?.find(i => i.infra_id === item.id) ? true : false                                
                                    return <IconeInfraestrutura key={item.titulo} item={item} ativo={ativo} />
                                })}
                            </div>
                        </div>
                    </BoxConteudo>
                </div>
            </section>
        </main>
    )
}