import { Espaco } from "../types/interface"

export const getUserEspacos = async (): Promise<Espaco[]> => {
    let espacos: Espaco[] = []
    const userId: number = 1

    try {
        const response = await fetch(`http://localhost:3000/espacos/user/${userId}`)
        const data = await response.json()
        
        espacos = data
    } catch (e) {
        console.error(e)
    }

    return espacos
}