import React from 'react'
import { useEffect, useState } from 'react'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import { Espaco } from '../types/interface'
import { FormEventoEstado } from '../types/interface'
import BoxConteudo from '../components/BoxConteudo/BoxConteudo'
import Botao from '../components/Botao/Botao'
import EspacoForm from '../components/EspacoForm/EspacoForm'

export default function MeuEspaco({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])
    
    const [formCaract, setFormCaract] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-0"})
    const [formEndereco, setFormEndereco] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [formInfra, setFormInfra] = useState<FormEventoEstado>({finalizado: false, estilo: "translate-x-full"})
    const [espacoAdicionado, setEspacoAdicionado] = useState<boolean>(false)
    const [espaco, setEspaco] = useState<Espaco>({
        nome: '',
        proprietarioID: 0,
        endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
            cep: '',
        },
        area: 88,
        capacidade: 100,
        ambientes: 3,
        quantidadeBanheiros: 4,
        descricao: '',
        infraestrutura: [],
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
            setFormInfra({ ...formInfra, estilo: "translate-x-0"})
            setTimeout(() => setFormEndereco({ ...formEndereco, estilo: '!hidden' }), 200);
        }

        if (formInfra.finalizado) {
            console.log('Finalizado')
        }
    }, [formCaract. finalizado, formEndereco.finalizado, formInfra.finalizado])

    if (!espacoAdicionado) {
        return (
            <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
                <EspacoForm />
            </main>
        )
    } else {
        return (
            <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
                <section>
                    <div className="container">
                        <h1>Meu Espaço</h1>
                    </div>
                </section>
                <section className="container">
                    {!espaco ?
                        <BoxConteudo className="justify-center items-center">
                            <h3>Nome do Espaço</h3>
                            <ul className="li">Capacidade máxima de pessoas</ul>
                            <ul className="li">Área total (m²)</ul>
                            <ul className="li">Número de salões / ambientes</ul>
                            <ul className="li">Altura do pé-direito</ul>
                            <ul className="li">Área externa / interna</ul>
                            <ul className="li">Quantidade de banheiros</ul>
                            <ul className="li">Quantidade de entradas / saídas</ul>
                            <ul className="li">Acessibilidade (rampa, elevador, etc.)</ul>                            
                        </BoxConteudo>
                    :
                        <BoxConteudo className="justify-center items-center">
                            <span className='w-1/3 mx-auto items-center text-center my-12'>
                                <Icon icon="mynaui:danger-triangle" className='text-7xl rotate-15 mb-4 text-neutral-300' />
                                <p className='mb-6 text-neutral-500'>Você ainda não tem um espaço cadastrado.<br />Cadastre seu primeiro espaço para começar a gerenciar eventos e cotações.</p>
                                <Botao tipo="outline" texto="Cadastrar Espaço" icone="mynaui:plus-circle" onClick={() => setEspacoAdicionado(true)} />
                            </span>
                        </BoxConteudo>
                    }
                </section>
            </main>
        )
    }
}