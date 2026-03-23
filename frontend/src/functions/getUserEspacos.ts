import { Espaco } from "../types/interface"

export const getUserEspacos = async (): Promise<Espaco[]> => {
    const token = sessionStorage.getItem("token")

    if (!token) return []

    const decoded = JSON.parse(atob(token.split('.')[1]))
    const userId = decoded.id

    let espacos: Espaco[] = []


    try {
        const response = await fetch(`http://localhost:3000/espacos/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        
        espacos = data
    } catch (e) {
        console.error(e)
    }

    return espacos
}