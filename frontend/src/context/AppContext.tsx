import { createContext, useEffect, useState } from "react"
import { Espaco } from "../types/interface"
import { getUserEspacos } from "../functions/getUserEspacos"

type ContextType = {
    menuLateralStatus: boolean
    setMenuLateralStatus: React.Dispatch<React.SetStateAction<boolean>>

    meusEspacos: Espaco[]
    setMeusEspacos: React.Dispatch<React.SetStateAction<Espaco[]>>

    reload: number
    reloadApp: () => void;
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [menuLateralStatus, setMenuLateralStatus] = useState<boolean>(true)
    const [meusEspacos, setMeusEspacos] = useState<Espaco[]>([])
    const [reload, setReload] = useState(0)

    useEffect(() => {
        fetchData()
    }, [reload])

    const fetchData = async () => {
        const data = await getUserEspacos()
        setMeusEspacos(data)
    }

    const reloadApp = () => setReload((prev) => prev + 1)

    return (
        <Context.Provider value={{ menuLateralStatus, setMenuLateralStatus, meusEspacos, setMeusEspacos, reload, reloadApp }}>
            {children}
        </Context.Provider>
    )
}
