export interface User {
    nome: string,
    email: string,
    senha: string,
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
    rua: string,
    numero: string,
    complemento?: string,
    referencia?: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: number,
}

export interface Espaco {
    id: number,
    nome: string,
    proprietario: User,
    endereco?: Endereco,

    area?: number
    capacidade?: number,
    ambientes?: number,
    quantidadeBanheiros?: number,
    quantidadeEntradasSaidas?: number[],
    acessibilidade?: boolean[]

    ativo: boolean
}

export interface FormEvento {
    finalizado: boolean,
    estilo: string
}