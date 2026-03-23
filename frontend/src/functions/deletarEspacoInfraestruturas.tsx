export const deletarEspacoInfraestruturas = async (espacoId: number): Promise<boolean> => {
    let status: boolean = false
    const token = sessionStorage.getItem('token')

    try {
        const response = await fetch(`http://localhost:3000/rel_espaco_infra/espaco/${espacoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    
        if (response.ok) {
            status = true      
        }
    } catch (erro) {
        status = false        
    }

    return status
}