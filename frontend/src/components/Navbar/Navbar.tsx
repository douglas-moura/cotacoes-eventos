/* 
    Este arquivo contem apenas o componente visual da barra de navegação,
    que é usada em todas as páginas. Ele é importado no arquivo src/router/index.tsx
    e renderizado dentro do BrowserRouter, para que os links funcionem corretamente.
*/
import React from 'react'
import { useLocation, Link } from "react-router-dom"

export default function Navbar(): React.JSX.Element {
    const { pathname } = useLocation()

    if (pathname === "/login") {
        return <></>
    } else {
        return (
            <nav className="absolute bg-red-500">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
            </nav>
        )
    }
}