import { Infra } from "../types/interface"

export const getInfraOpcoes = async (): Promise<Infra[]> => {
    let infrasOpcoes: Infra[] = [{ id: 0, titulo: "", icone: "" }]

    try {
        const response = await fetch('http://localhost:3000/infraestruturas/')
        const data = await response.json()

        if (response.ok) {
            infrasOpcoes = data
        }
    } catch (e) {
        console.error(e)
    }

    return infrasOpcoes
}