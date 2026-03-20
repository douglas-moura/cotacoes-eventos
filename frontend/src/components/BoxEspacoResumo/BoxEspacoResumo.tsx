import { useContext, useState } from "react"
import { Icon } from "@iconify/react"
import { Espaco } from "../../types/interface"
import { updateEspaco } from "../../functions/updateEspaco"
import { Link } from "react-router-dom"
import { Context } from "../../context/AppContext"
import './BoxEspacoResumo.css'

export default function BoxEspacoResumo({ espaco }: {espaco: Espaco}): React.JSX.Element {
    const [boxResumoStyle, setBoxResumoStyle] = useState<string>('')
    const [ativo, setAtivo] = useState<boolean>(espaco.ativo)
    const [visivel, setVisivel] = useState<boolean>(espaco.visivel)

    const context = useContext(Context)
    if (!context) return <></>
    const { reloadApp } = context

    return (
        <span className={`box-espaco-resumo group ${boxResumoStyle} ${ativo ? (visivel ? '' : 'opacity-50 saturate-0 bg-neutral-200') : '!hidden'}`}>
            <div className='w-2/10 box-espaco-resumo-img'>
                <img src="" alt="" className='w-full' />
            </div>
            <div className='w-8/10 pl-4'>
                <h3 className="box-espaco-resumo-titulo">{espaco.nome}</h3>
                <p className="box-espaco-resumo-descricao">{espaco.descricao.length > 200 ? espaco.descricao.slice(0, 200) + "..." : espaco.descricao}</p>
            </div>
            <span className="box-espaco-resumo-tools group-hover:!flex">
                <Icon className='tool-icone' icon="mynaui:edit-one" />
                <Icon className='tool-icone text-red-600' icon="mynaui:trash" onClick={() => {
                    updateEspaco(espaco.id, "apagar")
                    setBoxResumoStyle('scale-75')
                    setTimeout(() => {
                        setAtivo(false)
                    }, 500);
                }} />
                <Icon className='tool-icone' icon={visivel ? "mynaui:eye-off" : "mynaui:eye"} onClick={() => {
                    updateEspaco(espaco.id, visivel ? "ocultar" : "exibir")
                    setVisivel(!visivel)
                    reloadApp()
                }}  />
                <Link to={`/meu-espaco/${espaco.id}`}>
                    <Icon className='tool-icone' icon="mynaui:arrow-right"  />
                </Link>
            </span>
            <span className='box-espaco-resumo-nota'>
                <ul className=''>
                    <li className=''>&#9733;</li>
                    <li className=''>&#9733;</li>
                    <li className=''>&#9733;</li>
                    <li className=''>&#9733;</li>
                    <li className=''>&#9733;</li>
                </ul>
                <p className='ml-2 text-xs'>5,0</p>
            </span>
        </span>
        
    )
}