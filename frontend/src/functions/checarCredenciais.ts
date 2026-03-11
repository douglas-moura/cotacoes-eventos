export const checarCredenciais = async (email: string): Promise<boolean> => {
    let status: boolean = false

    try {
        const response = await fetch(`http://localhost:3000/users/${email}`)

        if (response.ok) {
            status = true
        }
    } catch (error) {
        console.error('Erro ao buscar informações:', error)
    }

    return status
}