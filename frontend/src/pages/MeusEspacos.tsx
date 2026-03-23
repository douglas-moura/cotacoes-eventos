import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import { Espaco, FormEventoEstado } from '../types/interface'
import { getUserEspacos } from '../functions/getUserEspacos'
import { Context } from '../context/AppContext'
import BoxConteudo from '../components/BoxConteudo/BoxConteudo'
import Botao from '../components/Botao/Botao'
import BoxEspacoResumo from '../components/BoxEspacoResumo/BoxEspacoResumo'
import './MeusEspacos.css'

export default function MeusEspacos({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => {
        if (!verificarLogin()) navigate('/login')
        fetchData()
    }, [])

    // pega espaços do banco a partir do context
    const context = useContext(Context)
    if (!context) return <></>
    const { meusEspacos, setMeusEspacos } = context
    
    const [formCaract, setFormCaract] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-0"})
    const [formEndereco, setFormEndereco] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [formInfra, setFormInfra] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [adicionarEspaco, setAdicionarEspaco] = useState<boolean>(false)
    const [formEspacosStyle, setFormEspacosStyle] = useState<string>('opacity-0')
    const [meusEspacosStyle, setMeusEspacosStyle] = useState<string>('')
    
    const fetchData = async () => {
        const data = await getUserEspacos()
        setMeusEspacos(data)
    }

    return (
        <main className={['pagina pagina-meus-espacos', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
            <section className={meusEspacosStyle}>
                <div className="container">
                    <h1 className='pagina-titulo'>{meusEspacos.length > 1 ? 'Meus Espaços' : 'Meu Espaço'}</h1>
                </div>
                <div className="container !min-h-[75dvh]">
                    {meusEspacos.length > 0 ?
                        <BoxConteudo className="!grid grid-cols-3">
                            <div>
                                <h2>Resumo</h2>
                                <p>Espaços cadastrados: {meusEspacos.length}</p>
                            </div>
                            <div className="col-span-2 relative">
                                <div className="grid gap-4 mb-8">
                                    {meusEspacos.map((espaco) => (
                                        <BoxEspacoResumo key={espaco.id} espaco={espaco} />
                                    ))}
                                </div>
                                <div>
                                    <Botao texto="Adicionar espaço" tipo="primario" icone='mynaui:plus-circle' onClick={() => {
                                        setTimeout(() => navigate(`/meu-espaco-edit/${0}`), 500)
                                    }} />
                                </div>
                            </div>
                        </BoxConteudo>
                    :
                        <div className="justify-center items-center my-auto">
                            <span className='w-1/3 mx-auto items-center text-center my-12'>
                                <Icon icon="mynaui:danger-triangle" className='text-7xl rotate-15 mb-4 text-neutral-300' />
                                <p className='mb-6 text-neutral-500'>Você ainda não tem um espaço cadastrado.<br />Cadastre seu primeiro espaço para começar a gerenciar eventos e cotações.</p>
                                <Botao tipo="outline" texto="Cadastrar Espaço" icone="mynaui:plus-circle" onClick={() => navigate('/meu-espaco-edit')} />
                            </span>
                        </div>
                    }
                </div>
            </section>
        </main>
    )
}