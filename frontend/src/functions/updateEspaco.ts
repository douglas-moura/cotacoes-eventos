export const updateEspaco = async (espacoId: number, acao: string): Promise<boolean> => {
    let status: boolean = false
    const token = sessionStorage.getItem('token')
    let data: any = {}

    switch (acao) {
        case 'apagar':
            data = {
                ativo: false,
                visivel: false
            }
            break
        case 'ocultar':
            data = {
                visivel: false
            }
            break
        case 'exibir':
            data = {
                visivel: true
            }
            break
        default:
            data = {}
    }

    try {
        const response = await fetch(`http://localhost:3000/espacos/${espacoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        
        if (response.ok) {
            status = true
        }
    } catch (e) {
        status = false
    }

    return status
}