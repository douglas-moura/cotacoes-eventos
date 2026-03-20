import React from 'react'
import { Icon } from '@iconify/react'
import { Infra } from '../../types/interface'
import './IconeInfraestrutura.css'

type Props = {
    item: Infra,
    ativo: boolean
}

export default function IconeInfraestrutura({item, ativo}: Props): React.JSX.Element {
    
    return (
        <span className={['box-icone-infra', ativo ? 'scale-100 opacity-100' : 'scale-50 opacity-0 absolute'].join(' ')}>
            <Icon icon={item?.icone || "teste"} className="box-icone-infra-icon" />
        </span>
    )
}