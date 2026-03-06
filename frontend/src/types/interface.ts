export interface User {
    nome: string;
    email: string;
    idade: number;
    senha: string;
}

export interface InputProps {
    InputType: string,
    inputLabel?: string,
    placeholder?: string,
    opcoes?: string[],
    value?: string,
    status?: boolean,
    onChange?: (value: string) => void
}