import React from "react"
import { Icon } from '@iconify/react'
import { useLocation } from "react-router"
import './topbar.css'

export default function Topbar({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    const { pathname } = useLocation()
    
    if (pathname === "/login" || pathname === "/cadastro" || pathname === "/reset") {
        return <></>
    } else {
        return (
            <header className={['topbar', menuStatus ? '!w-[82%]' : '!w-[95%]'].join(' ')}>
                <div className="topbar-conteudo">
                    <span className="topbar-icone-container">
                        <Icon icon="mynaui:cog-four" width="1.25rem" className="topbar-icone" />
                    </span>
                    <span className="topbar-icone-container">
                        <Icon icon="mynaui:bell" width="1.2rem" className="topbar-icone" />
                    </span>
                    <span className="topbar-icone-container bg-[var(--color-primaria-light)] !p-[.25rem]">
                        <Icon icon="mynaui:user-circle-solid" width="2rem"></Icon>
                        <p className="text-sm font-semibold ml-1 mr-3 leading-none">Nome</p>
                    </span>
                </div>
            </header>
        )
    }
}