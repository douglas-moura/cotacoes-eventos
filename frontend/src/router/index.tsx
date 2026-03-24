/*
    Este arquivo é responsável por definir as rotas da aplicação. Ele usa o BrowserRouter
    para envolver toda a aplicação, e o Routes para definir as rotas. Cada rota tem um path
    e um elemento, que é o componente que será renderizado quando a rota for acessada. O Navbar
    é renderizado dentro do BrowserRouter, para que os links funcionem corretamente.
*/
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context/AppContext"

import Navbar from "../components/Navbar/Navbar"
import Topbar from "../components/Topbar/Topbar"

import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro"
import ResetarSenha from "../pages/ResetarSenha"

import Home from "../pages/Home"
import MeusEspacos from "../pages/MeusEspacos"
import Servicos from "../pages/Servicos"
import About from "../pages/About"


import MeuEspacosDetalhes from "../pages/MeuEspacoDetalhes"
import EspacoForm from "../pages/EspacoForm"
import Default from "../pages/Default"

export default function App() {
    const context = useContext(Context)
    if (!context) return <></>
    const { menuLateralStatus } = context

    return (
        <BrowserRouter>
            <Navbar />
            {/*<Topbar menuStatus={menuLateralStatus} />*/}
            <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/home" element={<Home menuStatus={menuLateralStatus} />} />
                <Route path="/meus-espacos" element={<MeusEspacos menuStatus={menuLateralStatus} />} />
                <Route path="/servicos" element={<Servicos menuStatus={menuLateralStatus} />} />
                <Route path="/about" element={<About menuStatus={menuLateralStatus} />} />

                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/reset" element={<ResetarSenha />} />

                <Route path="/meu-espaco/:id" element={<MeuEspacosDetalhes menuStatus={menuLateralStatus} />} />
                <Route path="/meu-espaco-edit/:id" element={<EspacoForm menuStatus={menuLateralStatus} />} />
            </Routes>
        </BrowserRouter>
    )
}