import React from 'react'
import { Icon } from '@iconify/react'
import { InputProps } from '../../types/interface'
import './Input.css'

export default function Input({InputType, inputLabel, placeholder, opcoes, value, status, onChange}: InputProps): React.JSX.Element {
    switch (InputType) {
        case 'text':
            return (
                <span className='input-container'>
                    <label htmlFor="text">{inputLabel}</label>
                    <input type="text" placeholder={placeholder} className={`input-default ${status === true ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == true && <p className='text-[.5rem] mt-1 text-red-500'>Este campo é obrigatório</p>}
                </span>
            )
        case 'email':
            return (
                <span className='input-container'>
                    <label htmlFor="email">{inputLabel}</label>
                    <input type="email" placeholder="exemplo@email.com.br" className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == false && <p className='text-[.5rem] mt-1 text-red-500'>E-mail inválido</p>}
                </span>
            )
        case 'password-login':
            return (
                <span className='input-container'>
                    <label htmlFor="password">{inputLabel}</label>
                    <Icon icon="mdi:eye" width="20" className='icone-aux' />
                    <input type="password" placeholder={placeholder} className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
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
                    <input type="password" placeholder={placeholder} className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == false && <p className='text-[.5rem] mt-1 text-red-500'>{inputLabel == 'Senha' ? 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra e um número' : 'As senhas precisam ser iguais'}</p>}
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