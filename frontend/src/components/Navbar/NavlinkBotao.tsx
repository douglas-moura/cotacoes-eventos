import React, { useState, useContext } from "react"
import { Icon } from "@iconify/react"
import { useLocation, Link } from "react-router-dom"
import { Context } from "../../context/AppContext"
import { NavLinkBotaoProps } from "../../types/type"
import './Navbar.css'

export default function NavlinkBotao({path, texto, icone, status, seta}: NavLinkBotaoProps): React.JSX.Element {
    const context = useContext(Context)
    if (!context) return <></>

    const { menuLateralStatus, setMenuLateralStatus } = context
    const { pathname } = useLocation()

    console.log(menuLateralStatus);
    
    const funcaoNavlink = () => {
        console.log('executou');
        
        if (texto == 'Sair') logOut()
    }

    const logOut = () => {
        sessionStorage.removeItem('token')
    }

    return (
        <Link to={path} className={`navbar-link group ${pathname == path ? "navbar-link-ativo" : null}`} onClick={() => funcaoNavlink()}>
            <Icon icon={icone} className='navbar-link-icon' />
            <p className={status.visibilidadeTexto}>{texto}</p>
            {seta ? <Icon icon="mynaui:arrow-right" className={['navbar-seta', status.visibilidadeTexto].join(' ')} /> : null}
            {
                !status.aberto ?
                    <p className="navbar-texto-flutuante opacity-0 left-14 group-hover:opacity-100">{texto}</p>
                : null
            }
        </Link>
    )
}