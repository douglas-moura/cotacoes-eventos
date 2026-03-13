/* 
    Este arquivo contem apenas o componente visual da barra de navegação,
    que é usada em todas as páginas. Ele é importado no arquivo src/router/index.tsx
    e renderizado dentro do BrowserRouter, para que os links funcionem corretamente.
*/
import React, { useState, useContext } from 'react'
import { useLocation, Link } from "react-router-dom"
import { abrirMenu, fecharMenu } from '../../functions/toggleMenuLateral'
import { EstilosMenu } from '../../types/type'
import { Icon } from '@iconify/react'
import { Context } from '../../context/AppContext'
import RedapeNavbar from '../RodapeNavbar/RodapeNavbar'
import './NavBar.css'

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
                        <Link to="/" className={`navbar-link ${pathname == "/" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:home" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Home</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:map-pin-house-inside" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Meu Espaço</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:list-check" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Serviços</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:file-text" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Orçamentos</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:calendar" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Eventos</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:dollar" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Financeiro</p>
                        </Link>
                        <Link to="/login" className='navbar-link' onClick={() => logOut()}>
                            <Icon icon="mynaui:door-open" className='navbar-link-icon' />
                            <p className={menuStatus.visibilidadeTexto}>Sair</p>
                        </Link>
                    </nav>
                </div>
                <div>
                    <Link to="/suporte" className={`navbar-link ${pathname == "/suporte" ? "navbar-link-ativo" : null}`}>
                        <Icon icon="mynaui:user" className='navbar-link-icon' />
                        <p className={menuStatus.visibilidadeTexto}>Perfil</p>
                    </Link>
                    <Link to="/about" className={`navbar-link ${pathname == "/about" ? "navbar-link-ativo" : null}`}>
                        <Icon icon="mynaui:info-circle" className='navbar-link-icon' />
                        <p className={menuStatus.visibilidadeTexto}>Informações</p>
                    </Link>
                    <Link to="/suporte" className={`navbar-link ${pathname == "/suporte" ? "navbar-link-ativo" : null}`}>
                        <Icon icon="mynaui:question-circle" className='navbar-link-icon' />
                        <p className={menuStatus.visibilidadeTexto}>Suporte</p>
                        <Icon icon="mynaui:arrow-right" className={['navbar-seta', menuStatus.visibilidadeTexto].join(' ')} />
                    </Link>
                    <span className={menuStatus.visibilidadeTexto}>
                        <RedapeNavbar />
                    </span>
                </div>
            </aside>
        )
    }
}