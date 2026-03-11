import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { verificarLogin } from '../functions/auth'

export default function About(): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])

    return (
        <h1>About</h1>
    )
}