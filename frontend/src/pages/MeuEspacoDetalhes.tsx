import React, { useEffect, useState } from 'react'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'
import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { getEspaco } from '../functions/getEspaco'
import { Espaco, Infra } from '../types/interface'
import { getInfraestruturas } from '../functions/getInfraestruturas'
import BoxConteudo from "../components/BoxConteudo/BoxConteudo"
import './MeuEspacoDetalhes.css'
import Botao from '../components/Botao/Botao'

export default function MeuEspacosDetalhes({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])
    const [infraOpcoesGeral, setInfraOpcoesGeral] = useState<Infra[]>([])

    const { id } = useParams()
    const espacoId = id ? Number(id) : null
    if (!espacoId) return <></>
    
    const [espaco, setEspaco] = useState<Espaco>({
        id: 0, nome: '', descricao: '',
        area: 0, capacidade: 0, ambientes: 0, quantidadeBanheiros: 0,
        endereco: { rua: '', numero: '', bairro: '', cidade: '', uf: '', cep: '', },
        infraestruturas: [],
        proprietarioID: 0,
        ativo: true,
        visivel: true
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setEspaco(await getEspaco(espacoId))
        setInfraOpcoesGeral(await getInfraestruturas())
    }
    
    return (
        <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
            <section>
                <div className="container">
                    <Link to="/meus-espacos" className='mb-4 text-[var(--color-primaria-escuro)]'>
                        <span className='!flex-row items-center'>
                            <Icon icon="mynaui:arrow-left" className='mr-2 text-xl font-extrabold' />
                            <h4 className='!m-0 text-base'>Voltar</h4>
                        </span>
                    </Link>
                </div>
                <BoxConteudo className=''>
                    <div className="container grid-cols-2 relative">
                        <div className='coluna'>
                            <h1>{espaco.nome}</h1>
                            <p>{espaco.descricao}</p>
                            <div className='meu-espaco-detalhes-estrutura-container'>
                                <span className='meu-espaco-detalhes-estrutura-box'>
                                    <h4>Área</h4>
                                    <p className='meu-espaco-detalhes-estrutura-titulo'>{espaco.area} m²</p>
                                </span>
                                <span className='meu-espaco-detalhes-estrutura-box'>
                                    <h4>Capacidade</h4>
                                    <p className='meu-espaco-detalhes-estrutura-titulo'>{espaco.capacidade} pessoas</p>
                                </span>
                                <span className='meu-espaco-detalhes-estrutura-box'>
                                    <h4>Ambientes</h4>
                                    <p className='meu-espaco-detalhes-estrutura-titulo'>{espaco.ambientes}</p>
                                </span>
                                <span className='meu-espaco-detalhes-estrutura-box'>
                                    <h4>Banheiros</h4>
                                    <p className='meu-espaco-detalhes-estrutura-titulo'>{espaco.quantidadeBanheiros}</p>
                                </span>
                            </div>
                            <div className='meu-espaco-detalhes-endereco-container'>
                                <h3>Endereço</h3>
                                <p>{espaco.endereco.rua}, {espaco.endereco.numero} {espaco.endereco.complemento ? ' - ' + espaco.endereco.complemento : null}</p>
                                <p>{espaco.endereco.referencia ? espaco.endereco.referencia : null}</p>
                                <p>{espaco.endereco.bairro} - CEP {espaco.endereco.cep}</p>
                                <p>{espaco.endereco.cidade} - {espaco.endereco.uf}</p>
                            </div>
                            <div className='meu-espaco-detalhes-infras-container'>
                                <h3>Infraestrutura</h3>
                                {espaco.infraestruturas?.length ?
                                    <div className='meu-espaco-detalhes-infras-list'>
                                        {espaco.infraestruturas ?
                                            espaco.infraestruturas.map((item) => {
                                                const infra = infraOpcoesGeral.find((i) => i.id === item.infra_id)
                                                if (!infra) return null
                                                return (
                                                    <span key={item.infra_id} className='meu-espaco-detalhes-infras-box'>
                                                        <Icon icon={infra.icone ?? 'teste'} className='meu-espaco-detalhes-infras-icon' />
                                                        <p className='meu-espaco-detalhes-infras-texto'>{infra?.titulo}</p>
                                                    </span>
                                                )
                                            })
                                        : null}
                                    </div>
                                : <p>Nenhum infraestrutura cadastrada...</p>}
                            </div>
                        </div>
                        <div>
                            <p>teste</p>
                        </div>
                    </div>
                </BoxConteudo>
            </section>
        </main>
    )
}