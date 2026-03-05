import React from 'react'
import { Icon } from '@iconify/react'
import './Input.css'

export default function Input({InputType, inputLabel}: {InputType: string, inputLabel?: string}): React.JSX.Element {
    switch (InputType) {
        case 'email':
            return (
                <span className='input-container'>
                    <label htmlFor="email">{inputLabel}</label>
                    <input type="email" placeholder="exemplo@email.com.br" className="input-default" />
                </span>
            )
        case 'password':
            return (
                <span className='input-container'>
                    <label htmlFor="password">{inputLabel}</label>
                    <Icon icon="mdi:eye" width="18" id='icone-ver-senha' />
                    <input type="password" placeholder="********" className="input-default" />
                    <div id='password-assets' className='text-xs my-2'>
                        <div className="text-gray-500 items-center flex">
                            <input type="checkbox" id="lembrar-password" className="mr-2" />
                            Lembre-se de mim
                        </div>
                        <a href="/esqueci-senha" className="link">
                            Esqueci minha senha
                        </a>
                    </div>
                </span>
            )
        default:
            return (
                <span>
                    {inputLabel && <label htmlFor={InputType}>{inputLabel}</label>}
                    <input type={InputType} placeholder={inputLabel} className="input-default" />
                </span>
            )
    }
}