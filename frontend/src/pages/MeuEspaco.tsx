import React from 'react'
import { useEffect, useState } from 'react'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import { Espaco } from '../types/interface'
import BoxConteudo from '../components/BoxConteudo/BoxConteudo'
import Botao from '../components/Botao/Botao'
import EspacoForm from '../components/EspacoForm/EspacoForm'

export default function MeuEspaco({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])

    const [espacoAdicionado, setEspacoAdicionado] = useState<boolean>(false)
    const [espaco, setEspaco] = useState<Espaco>({
        id: 1,
        nome: 'TheRedLotus',
        proprietario: {
            nome: "Douglas",
            email: "douglas@email.com",
            senha: "12345",
        },
        endereco: {
            rua: 'A',
            numero: '1212',
            bairro: 'Vila Nova',
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

    if (!espacoAdicionado) {
        return (
            <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
                <section>
                    <div className="container grid-cols-2 !gap-16">
                        <span>
                            <h1>Adicionar novo espaço</h1>
                            <EspacoForm />
                        </span>
                        <BoxConteudo>
                            <div>
                                <h3>Título</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat dolor massa, rhoncus tincidunt lacus feugiat et. Sed facilisis leo quis nisi facilisis vulputate. Mauris viverra varius massa, et luctus arcu gravida quis. Maecenas mauris ante, feugiat sit amet blandit id, tempus eget ipsum. Aliquam odio tellus, rutrum sit amet nisi vel, ullamcorper tempor arcu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat dolor massa, rhoncus tincidunt lacus feugiat et. Sed facilisi</p>
                                <h4>Endereço</h4>
                                <p>Rua Marginal Direita, 293 - Casa</p>
                                <p>Proximo a garagem de onibus</p>
                                <p>CEP 08535-450 - Vila Mariana</p>
                                <p>São Paulo - SP</p>
                                <div className='grid grid-cols-7'>
                                    <span>
                                        <Icon icon='mynaui:arrow-diagonal-two-solid' />
                                    </span>
                                </div>
                            </div>
                        </BoxConteudo>
                    </div>
                </section>
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