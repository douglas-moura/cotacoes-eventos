import React from 'react'
import { useEffect } from 'react'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'

export default function Default(): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => {
        if (!verificarLogin()) navigate('/login')
        console.log('montou a default');
    }, [])
    return <main></main>
}