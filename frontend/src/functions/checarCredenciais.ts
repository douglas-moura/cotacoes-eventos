export const checarCredenciais = async ({email, senha}: {email: string, senha?: string}): Promise<number> => {
    let result: number = 0

    try {
        const response = await fetch(`http://localhost:3000/users/${email}`)
        const data = await response.json()

        if (data) result++
    } catch (error) {
        console.error('Erro ao buscar informações:', error)
    }

    return result
}