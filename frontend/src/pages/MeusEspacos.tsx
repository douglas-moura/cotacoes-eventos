import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import { Espaco } from '../types/interface'
import { FormEventoEstado } from '../types/interface'
import { getUserEspacos } from '../functions/getUserEspacos'
import { Context } from '../context/AppContext'
import BoxConteudo from '../components/BoxConteudo/BoxConteudo'
import Botao from '../components/Botao/Botao'
import EspacoForm from '../components/EspacoForm/EspacoForm'
import './MeusEspacos.css'
import BoxEspacoResumo from '../components/BoxEspacoResumo/BoxEspacoResumo'

export default function MeuEspaco({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => {
        if (!verificarLogin()) {
            navigate('/login')
        }
    }, [])
    const context = useContext(Context)
    if (!context) return <></>
    const { meusEspacos, setMeusEspacos } = context
    
    const [formCaract, setFormCaract] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-0"})
    const [formEndereco, setFormEndereco] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [formInfra, setFormInfra] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [adicionarEspaco, setAdicionarEspaco] = useState<boolean>(false)
    const [meusEspacosStyle, setMeusEspacosStyle] = useState<string>('')
    const [formEspacosStyle, setFormEspacosStyle] = useState<string>('opacity-0')
    
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

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (adicionarEspaco) {
            setMeusEspacosStyle('opacity-0')
            setTimeout(() => {
                setFormEspacosStyle('opacity-100')
            }, 100)
        }

        if (!adicionarEspaco) {
            setFormEspacosStyle('opacity-0')
            fetchData()
            setTimeout(() => {
                setMeusEspacosStyle('opacity-100')
            }, 300)
        }
    }, [adicionarEspaco])

    const receberDadosForm = (result: boolean) => {
        setAdicionarEspaco(!result)
    }

    const fetchData = async () => {
        const data = await getUserEspacos()
        setMeusEspacos(data)
    }

    return (
        <main className={['pagina pagina-meus-espacos', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
            {adicionarEspaco ?
                <>
                    <section className={formEspacosStyle}>
                        <EspacoForm enviarDados={receberDadosForm} />
                    </section>
                </>
            :
                <>
                    <section className={meusEspacosStyle}>
                        <div className="container">
                            <h1 className='pagina-titulo'>{meusEspacos.length > 1 ? 'Meus Espaços' : 'Meu Espaço'}</h1>
                        </div>
                        <div className="container">
                            {meusEspacos ?
                                <BoxConteudo className="!grid grid-cols-3">
                                    <div>
                                        <h2>Resumo</h2>
                                        <p>Espaços cadastrados: {meusEspacos.length}</p>
                                    </div>
                                    <div className="col-span-2 relative">
                                        <div className="overflow-y-scroll overflow-y-hidden h-[320px] grid gap-4 mb-8">
                                            {meusEspacos.map((espaco) => (
                                                <BoxEspacoResumo espaco={espaco} />
                                            ))}
                                        </div>
                                        <div>
                                            <Botao texto="Adicionar espaço" tipo="primario" icone='mynaui:plus-circle' onClick={() => {
                                                setTimeout(() => setAdicionarEspaco(true), 500)
                                            }} />
                                        </div>
                                    </div>
                                </BoxConteudo>
                            :
                                <BoxConteudo className="justify-center items-center">
                                    <span className='w-1/3 mx-auto items-center text-center my-12'>
                                        <Icon icon="mynaui:danger-triangle" className='text-7xl rotate-15 mb-4 text-neutral-300' />
                                        <p className='mb-6 text-neutral-500'>Você ainda não tem um espaço cadastrado.<br />Cadastre seu primeiro espaço para começar a gerenciar eventos e cotações.</p>
                                        <Botao tipo="outline" texto="Cadastrar Espaço" icone="mynaui:plus-circle" onClick={() => setAdicionarEspaco(true)} />
                                    </span>
                                </BoxConteudo>
                            }
                        </div>
                    </section>
                </>
            }
        </main>
    )
}