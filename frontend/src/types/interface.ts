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
    nome: string,
    descricao: string,
    area?: number
    capacidade?: number,
    ambientes?: number,
    quantidadeBanheiros?: number,
    proprietario: User,
    endereco?: Endereco,

    infraestrutura?: string[]

    ativo: boolean
}

export interface FormEventoEstado {
    finalizado: boolean,
    estilo: string
}