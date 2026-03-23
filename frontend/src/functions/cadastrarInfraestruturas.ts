export const cadastrarInfraestruturas = async (espacoID: number, infraID: number): Promise<boolean> => {
    let status: boolean = false
    const token = sessionStorage.getItem('token')

    try {
        const response = await fetch('http://localhost:3000/rel_espaco_infra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                espaco_id: espacoID,
                infra_id: infraID
            })
        })
    
        if (response.ok) {
            status = true            
        }
    } catch (erro) {
        status = false        
    }

    return status
}