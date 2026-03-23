import React, { useState, useEffect } from "react"
import { Endereco } from "../../../types/interface"
import { estadosBrasil } from "../../../functions/estadosBrasil"
import Input from "../../Input/Input"
import validate from "../../../functions/validate"

type Props = {
    enviarDados: (valor: Endereco) => void,
    statusForm: boolean,
    infosEdit: {
        rua: string,
        numero: string,
        complemento: string | undefined,
        referencia: string | undefined,
        bairro: string,
        cidade: string,
        uf: string,
        cep: string,
    }
}

export default function EnderecoForm({ statusForm, infosEdit, enviarDados }: Props): React.JSX.Element {
    const [cepValido, setCepValido] = useState<boolean>(false)
    const [endereco, setEndereco] = useState<Endereco>({
        status: statusForm,
        rua: '',
        numero: '',
        complemento: '',
        referencia: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
    })
    
    useEffect(() => {
        enviarDados(endereco)
    }, [endereco])
    
    useEffect(() => {
        setEndereco(prev => ({
            ...prev,
            status: statusForm
        }))

        setCepValido(validate({ tipo: 'cep', valor: endereco.cep }))
    }, [statusForm, endereco.cep])
    
    useEffect(() => {
        if (infosEdit) {
            console.log(infosEdit);
            
            setEndereco(prev => ({
                ...prev,
                ...infosEdit
            }))
        }
    }, [JSON.stringify(infosEdit)])

    return (
        <>
            <div className="espaco-form-subform grid-cols-5">
                <Input
                    inputType="text"
                    inputLabel="Endereço"
                    placeholder="Av. Nossa Senhora da Graça"
                    value={endereco.rua}
                    status={!(endereco.rua.length == 0 && !endereco.status)}
                    onChange={(value) => setEndereco({ ...endereco, rua: value })}

                    className="col-span-4"
                />
                <Input
                    inputType="text"
                    inputLabel="Nº"
                    value={endereco.numero}
                    status={!(endereco.numero.length == 0 && !endereco.status)}
                    onChange={(value) => setEndereco({ ...endereco, numero: value })}
                />
                <Input
                    inputType="text"
                    inputLabel="Complemento"
                    value={endereco.complemento}
                    onChange={(value) => setEndereco({ ...endereco, complemento: value })}

                    className="col-span-3"
                />
                <Input
                    inputType="cep"
                    inputLabel="CEP"
                    value={endereco.cep}
                    status={!(!cepValido && !endereco.status)}
                    onChange={(value) => setEndereco({ ...endereco, cep: value })}

                    className="col-span-2"
                />
                <Input
                    inputType="text"
                    inputLabel="Bairro"
                    value={endereco.bairro}
                    status={!(endereco.bairro.length == 0 && !endereco.status)}
                    onChange={(value) => setEndereco({ ...endereco, bairro: value })}

                    className="col-span-2"
                />
                <Input
                    inputType="text"
                    inputLabel="Ponto de Referência"
                    value={endereco.referencia}
                    onChange={(value) => setEndereco({ ...endereco, referencia: value })}

                    className="col-span-3"
                />
                <Input
                    inputType="text"
                    inputLabel="Cidade"
                    value={endereco.cidade}
                    status={!(endereco.cidade.length == 0 && !endereco.status)}
                    onChange={(value) => setEndereco({ ...endereco, cidade: value })}
                    className="col-span-4"
                />
                <Input
                    inputType="lista"
                    inputLabel="UF"
                    opcoes={estadosBrasil}
                    value={endereco.uf}
                    status={!(endereco.uf.length == 0 && !endereco.status)}
                    onChange={(value) => setEndereco({ ...endereco, uf: value })}
                />
            </div>
        </>
    )
}