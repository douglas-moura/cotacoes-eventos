import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { InputProps } from '../../types/type'
import './Input.css'

export default function Input({inputType, inputLabel, placeholder, opcoes, value, status, className = "", onChange}: InputProps): React.JSX.Element {
    const [verSenha, setVerSenha] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: any) => setIsChecked(event.target.checked);

    switch (inputType) {
        case 'text':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="text">{inputLabel}</label>
                    <input type="text" placeholder={placeholder} className={`input-default ${status === true ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == true && <p className='text-[.5rem] mt-1 text-red-500'>Este campo é obrigatório</p>}
                </span>
            )
        case 'text-longo':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="text">{inputLabel}</label>
                    <textarea
                        placeholder={placeholder}
                        className={`input-default w-full ${status === true ? 'input-alert' : ''}`}
                        value={value}
                        maxLength={500}
                        onChange={(e) => onChange && onChange(e.target.value)}
                    />
                    {status === true && (<p className='text-[.5rem] mt-1 text-red-500'>Este campo é obrigatório</p>)}
                </span>
            )
        case 'number':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="email">{inputLabel}</label>
                    <input type="number" placeholder={placeholder} className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                </span>
            )
        case 'cep':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="email">{inputLabel}</label>
                    <input type="number" placeholder="00000-000" className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == false && <p className='text-[.5rem] mt-1 text-red-500'>CEP inválido</p>}
                </span>
            )
        case 'email':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="email">{inputLabel}</label>
                    <input type="email" placeholder="exemplo@email.com.br" className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == false && <p className='text-[.5rem] mt-1 text-red-500'>E-mail inválido</p>}
                </span>
            )
        case 'password-login':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="password">{inputLabel}</label>
                    <Icon icon={!verSenha ? 'mdi:eye' : 'mdi:eye-off'} width="20" className='icone-aux' onClick={() => setVerSenha(!verSenha)} />
                    <input type={!verSenha ? 'password' : 'text'} placeholder={placeholder} className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    <div id='password-assets' className='text-xs my-2'>
                        <div className="text-gray-500 items-center flex">
                            <input type="checkbox" id="lembrar-password" className="mr-2" />
                            Lembre-se de mim
                        </div>
                        <a href="/reset" className="link">
                            Esqueci minha senha
                        </a>
                    </div>
                </span>
            )
        case 'password-cadastro':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="password">{inputLabel}</label>
                    <Icon icon={!verSenha ? 'mdi:eye' : 'mdi:eye-off'} width="20" className='icone-aux' onClick={() => setVerSenha(!verSenha)} />
                    <input type={!verSenha ? 'password' : 'text'} placeholder={placeholder ?? '********'} className={`input-default ${status === false ? 'input-alert' : ''}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
                    {status == false && <p className='text-[.5rem] mt-1 text-red-500'>{inputLabel == 'Senha' || inputLabel == 'Nova Senha' ? 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra e um número' : 'As senhas precisam ser iguais'}</p>}
                </span>
            )
        case 'lista':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor="lista">{inputLabel}</label>
                    <Icon icon="mdi:keyboard-arrow-down" width="20" className='icone-aux' />
                    <select className="input-default">
                        {opcoes?.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
                    </select>
                </span>
            )
        case 'toggle':
            return (
                <span className={`input-container ${className}`}>
                    <label htmlFor={`checkbox-${inputLabel}`} className="flex flex-row items-center">
                        <Icon
                            icon={isChecked ? "mynaui:toggle-right-solid" : "mynaui:toggle-left"}
                            className={['input-toggle-icon', isChecked ? 'input-toggle-ativo' : ''].join(' ')}
                        />
                    </label>
                    <p className=''>{inputLabel}</p>
                    <input id={`checkbox-${inputLabel}`} type="checkbox" placeholder="exemplo@email.com.br" className={`input-default ${status === false ? 'input-alert' : ''}`} checked={isChecked} onChange={handleCheckboxChange} />
                </span>
            )
        default:
            return (
                <span>
                    {inputLabel && <label htmlFor={inputType}>{inputLabel}</label>}
                    <input type={inputType} placeholder={inputLabel} className="input-default" />
                </span>
            )
    }
}