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

import Navbar from "../components/Navbar/Navbar"

export default function Router() {    
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    )
}