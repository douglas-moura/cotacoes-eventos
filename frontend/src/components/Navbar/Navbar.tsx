/* 
    Este arquivo contem apenas o componente visual da barra de navegação,
    que é usada em todas as páginas. Ele é importado no arquivo src/router/index.tsx
    e renderizado dentro do BrowserRouter, para que os links funcionem corretamente.
*/
import React, { useState, useContext } from 'react'
import { useLocation, Link } from "react-router-dom"
import { abrirMenu, fecharMenu } from '../../functions/toggleMenuLateral'
import { EstilosMenu } from '../../types/interface'
import { Icon } from '@iconify/react'
import { Context } from '../../context/AppContext'
import RedapeNavbar from '../RodapeNavbar/RodapeNavbar'
import './NavBar.css'
import NavlinkBotao from './NavlinkBotao'

export default function Navbar(): React.JSX.Element {
    const context = useContext(Context)
    if (!context) return <></>
    const { menuLateralStatus, setMenuLateralStatus } = context

    const { pathname } = useLocation()
    const [menuStatus, setMenuStatus] = useState<EstilosMenu>({aberto: menuLateralStatus, visibilidadeTexto: ''})

    const logOut = () => {
        sessionStorage.removeItem('token')
    }

    const toggleMenu = () => {
        if (menuStatus.aberto) {
            fecharMenu({setMenuStatus: setMenuStatus})
            setTimeout(() => setMenuLateralStatus(false), 300)
        } else {
            abrirMenu({setMenuStatus: setMenuStatus})
            setMenuLateralStatus(true)
        }
    }

    if (pathname === "/login" || pathname === "/cadastro" || pathname === "/reset") {
        return <></>
    } else {
        return (
            <aside className={['navbar-aside', menuStatus.aberto ? 'min-w-[18%]' : 'min-w-[3%]'].join(' ')}>
                <span className="navbar-recolhe" onClick={() => toggleMenu()}>
                    <Icon icon={menuStatus.aberto ? 'mynaui:chevron-left' : 'mynaui:chevron-right'} width="1.2rem" />
                </span>
                <div>
                    <div className="logo-container">
                        <Icon icon="hugeicons:home-12" className={['logo-icone', menuStatus.aberto ? 'text-[2.5rem]' : 'text-[2rem] -ml-[.2rem]'].join(' ')} />
                        <p className={['logo-titulo font-outfit', menuStatus.visibilidadeTexto].join(' ')}>Eventfy</p>
                    </div>
                    <nav className="navbar-container">
                        <NavlinkBotao path='/' texto='Home' icone='mynaui:home' status={menuStatus} seta={false} />
                        <NavlinkBotao path='/meu-espaco' texto='Meu Espaço' icone='mynaui:map-pin-house-inside' status={menuStatus} seta={false} />
                        <NavlinkBotao path='/s' texto='Serviços' icone='mynaui:list-check' status={menuStatus} seta={false} />
                        <NavlinkBotao path='/o' texto='Orçamentos' icone='mynaui:file-text' status={menuStatus} seta={false} />
                        <NavlinkBotao path='/e' texto='Eventos' icone='mynaui:calendar' status={menuStatus} seta={false} />
                        <NavlinkBotao path='/f' texto='Financeiro' icone='mynaui:dollar' status={menuStatus} seta={false} />
                        <NavlinkBotao path='/login' texto='Sair' icone='mynaui:door-open' status={menuStatus} seta={false} />
                    </nav>
                </div>
                <div>
                    <NavlinkBotao path='/about' texto='Perfil' icone='mynaui:user' status={menuStatus} seta={false} />
                    <NavlinkBotao path='/' texto='Informações' icone='mynaui:info-circle' status={menuStatus} seta={false} />
                    <NavlinkBotao path='/' texto='Suporte' icone='mynaui:question-circle' status={menuStatus} seta={true} />
                    <span className={menuStatus.visibilidadeTexto}>
                        <RedapeNavbar />
                    </span>
                </div>
            </aside>
        )
    }
}