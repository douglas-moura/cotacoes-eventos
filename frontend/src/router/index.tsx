/*
    Este arquivo é responsável por definir as rotas da aplicação. Ele usa o BrowserRouter
    para envolver toda a aplicação, e o Routes para definir as rotas. Cada rota tem um path
    e um elemento, que é o componente que será renderizado quando a rota for acessada. O Navbar
    é renderizado dentro do BrowserRouter, para que os links funcionem corretamente.
*/
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import About from "../pages/About"
import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro"
import ResetarSenha from "../pages/ResetarSenha"

import Navbar from "../components/Navbar/Navbar"
import { useContext } from "react"
import { Context } from "../context/AppContext"

export default function App() {    
    const context = useContext(Context)
    if (!context) return <></>
    const { menuLateralStatus } = context

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home menuStatus={menuLateralStatus} />} />
                <Route path="/about" element={<About menuStatus={menuLateralStatus} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/reset" element={<ResetarSenha />} />
            </Routes>
        </BrowserRouter>
    )
}