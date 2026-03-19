export interface UserLogado {
    token: string,
    id: number,
    email: string,
    nome: string
}

export interface NovoUser {
    nome: string,
    email: string,
    senha: string
}

export interface NovoAcesso {
    user_id: number,
    dispositivo: string,
}

export interface EstilosMenu {
    aberto: boolean,
    visibilidadeTexto: string
}

export interface Endereco {
    status?: boolean,
    rua: string,
    numero: string,
    complemento?: string,
    referencia?: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
}

export interface Espaco {
    nome: string,
    descricao: string,
    area: number
    capacidade: number,
    ambientes: number,
    quantidadeBanheiros: number,
    proprietarioID: number,
    endereco: Endereco,

    infraestrutura?: number[]

    ativo: boolean
}

export interface FormEventoEstado {
    finalizado: boolean,
    estilo: string,
    status?: boolean
}

export interface Infra {
    id: number,
    titulo: string
    icone: string
}