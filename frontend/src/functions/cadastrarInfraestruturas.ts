export const cadastrarInfraestruturas = async (espacoID: number, infraID: number) => {
    let status: boolean = false

    try {
        const response = await fetch('http://localhost:3000/rel_espaco_infra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
}