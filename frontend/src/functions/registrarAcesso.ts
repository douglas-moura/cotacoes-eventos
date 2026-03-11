import { NovoAcesso } from "../types/interface"
//import { UAParser } from "ua-parser-js"

export const registrarAcesso = async (userId: number): Promise<void> => {
    let status: boolean = false
    /*
    const parser = new UAParser()
    const result = parser.getResult()
    const dispositivo = `${result.browser.name ?? "Unknown"} - ${result.os.name ?? "Unknown"} - ${result.device.type ?? "desktop"}`
    novoAcesso.dispositivo = dispositivo
    */
    try {
        const login_infos: NovoAcesso = {
            user_id: userId,
            dispositivo: navigator.userAgent
        }

        const response = await fetch('http://localhost:3000/acessos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_infos)
        })
    
        if (response.ok) {
            status = true
        }
    } catch (error) {        
        status = false
    }

    //return status
}