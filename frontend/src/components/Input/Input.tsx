import React from 'react'
import { Icon } from '@iconify/react'
import './Input.css'

export default function Input({InputType, inputLabel, placeholder, opcoes}: {InputType: string, inputLabel?: string, placeholder?: string, opcoes?: string[]}): React.JSX.Element {
    switch (InputType) {
        case 'text':
            return (
                <span className='input-container'>
                    <label htmlFor="text">{inputLabel}</label>
                    <input type="text" placeholder={placeholder} className="input-default" />
                </span>
            )
        case 'email':
            return (
                <span className='input-container'>
                    <label htmlFor="email">{inputLabel}</label>
                    <input type="email" placeholder="exemplo@email.com.br" className="input-default" />
                </span>
            )
        case 'password-login':
            return (
                <span className='input-container'>
                    <label htmlFor="password">{inputLabel}</label>
                    <Icon icon="mdi:eye" width="20" className='icone-aux' />
                    <input type="password" placeholder={placeholder} className="input-default" />
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
        case 'password-cadastro':
            return (
                <span className='input-container'>
                    <label htmlFor="password">{inputLabel}</label>
                    <Icon icon="mdi:eye" width="20" className='icone-aux' />
                    <input type="password" placeholder={placeholder} className="input-default" />
                </span>
            )
        case 'lista':
            return (
                <span className='input-container'>
                    <label htmlFor="lista">{inputLabel}</label>
                    <Icon icon="mdi:keyboard-arrow-down" width="20" className='icone-aux' />
                    <select className="input-default">
                        {opcoes?.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
                    </select>
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