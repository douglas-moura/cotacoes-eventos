import { EstilosMenu } from "./interface"

export type InputProps = {
    inputType: string,
    inputLabel?: string,
    placeholder?: string,
    opcoes?: string[],
    value?: string | number,
    status?: boolean,
    check?: boolean,
    className?: string,
    onChange?: (value: string) => void
}

export type BoxConteudoProps = {
    children: React.ReactNode
    className?: string
}

export type NavLinkBotaoProps = {
    path: string,
    texto: string,
    icone: string,
    status: EstilosMenu,
    seta: boolean
}

export type EspacoCaracteristicasProps = {
    status: boolean,
    nome: string,
    descricao: string,
    area: number,
    capacidade: number,
    ambientes: number,
    banheiros: number
}

export type ToggleInputProps = {
    check: boolean
}