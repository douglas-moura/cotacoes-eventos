import { EstilosMenu } from "../types/interface"

type Props = {
    setMenuStatus: React.Dispatch<React.SetStateAction<EstilosMenu>>
}

export const fecharMenu = ({ setMenuStatus }: Props) => {
    // AÇÃO 01
    setMenuStatus({ aberto: true, visibilidadeTexto: 'opacity-0' })

    // AÇÃO 02
    setTimeout(() => setMenuStatus({ aberto: false, visibilidadeTexto: '!hidden' }), 300)
}

export const abrirMenu = ({ setMenuStatus }: Props) => {
    // AÇÃO 01 - esmaecer texto
    setMenuStatus({ aberto: true, visibilidadeTexto: '!hidden' })

    // AÇÃO 02
    setTimeout(() => setMenuStatus({ aberto: true, visibilidadeTexto: 'opacity-0' }), 300)

    // AÇÃO 03
    setTimeout(() => setMenuStatus({ aberto: true, visibilidadeTexto: 'opacity-100' }), 400)
}