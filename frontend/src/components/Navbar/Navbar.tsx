/* 
    Este arquivo contem apenas o componente visual da barra de navegação,
    que é usada em todas as páginas. Ele é importado no arquivo src/router/index.tsx
    e renderizado dentro do BrowserRouter, para que os links funcionem corretamente.
*/
import React from 'react'
import { useLocation, Link } from "react-router-dom"
import { Icon } from '@iconify/react'
import RedapeNavbar from '../RodapeNavbar/RodapeNavbar'
import './NavBar.css'

export default function Navbar(): React.JSX.Element {
    const { pathname } = useLocation()
    const logOut = () => sessionStorage.removeItem('token')

    if (
        pathname === "/login" ||
        pathname === "/cadastro" ||
        pathname === "/reset"
    ) {
        return <></>
    } else {
        return (
            <aside className="navbar-aside">
                <div>
                    <div className="logo-container">
                        <Icon icon="hugeicons:home-12" width="2.5rem" className="logo-icone" />
                        <p className="">Eventfy</p>
                    </div>
                    <nav className="navbar-container">
                        <Link to="/" className={`navbar-link ${pathname == "/" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:home" className='navbar-link-icon' />
                            <p>Home</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:map-pin-house-inside" className='navbar-link-icon' />
                            <p>Meu Espaço</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:list-check" className='navbar-link-icon' />
                            <p>Serviços</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:file-text" className='navbar-link-icon' />
                            <p>Orçamentos</p>
                        </Link>
                        <Link to="/" className={`navbar-link ${pathname == "/espaco" ? "navbar-link-ativo" : null}`}>
                            <Icon icon="mynaui:calendar" className='navbar-link-icon' />
                            <p>Calendário</p>
                        </Link>
                        <Link to="/login" className='navbar-link' onClick={() => logOut()}>
                            <Icon icon="mynaui:logout" className='navbar-link-icon' />
                            <p>Sair</p>
                        </Link>
                        {/*
                        <Link to="/login">Login</Link>
                        <Link to="/cadastro">Cadastro</Link>
                        <Link to="/reset">Reset</Link>
                        */}
                    </nav>
                </div>
                <div>
                    <Link to="/suporte" className={`navbar-link ${pathname == "/suporte" ? "navbar-link-ativo" : null}`}>
                        <Icon icon="mynaui:user" className='navbar-link-icon' />
                        <p>Perfil</p>
                    </Link>
                    <Link to="/about" className={`navbar-link ${pathname == "/about" ? "navbar-link-ativo" : null}`}>
                        <Icon icon="mynaui:info-circle" className='navbar-link-icon' />
                        <p>Informações</p>
                    </Link>
                    <Link to="/suporte" className={`navbar-link ${pathname == "/suporte" ? "navbar-link-ativo" : null}`}>
                        <Icon icon="mynaui:question-circle" className='navbar-link-icon' />
                        <p>Suporte</p>
                        <Icon icon="mynaui:arrow-right" className='navbar-seta' />
                    </Link>
                    <RedapeNavbar />
                </div>
            </aside>
        )
    }
}