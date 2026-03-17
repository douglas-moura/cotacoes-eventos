import React, { useState, useEffect } from "react"
import { Endereco } from "../../../types/interface"
import { estadosBrasil } from "../../../functions/estadosBrasil"
import Input from "../../Input/Input"

type Props = {
    enviarDados: (valor: Endereco) => void
}

export default function EnderecoForm({ enviarDados }: Props): React.JSX.Element {
    const [endereco, setEndereco] = useState<Endereco>({
        rua: '',
        numero: '',
        complemento: '',
        referencia: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: 0,
    })
        
    useEffect(() => mandarDadosCompPai(), [endereco])

    const mandarDadosCompPai = () => enviarDados(endereco)

    return (
        <>
            <div className="espaco-form-subform grid-cols-5">
                <Input
                    inputType="text"
                    inputLabel="Endereço"
                    placeholder="Av. Nossa Senhora da Graça"
                    value={endereco.rua}
                    onChange={(value) => setEndereco({ ...endereco, rua: value })}

                    className="col-span-4"
                />
                <Input
                    inputType="text"
                    inputLabel="Nº"
                    value={endereco.numero}
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
                    onChange={(value) => setEndereco({ ...endereco, cep: parseInt(value) })}

                    className="col-span-2"
                />
                <Input
                    inputType="text"
                    inputLabel="Bairro"
                    value={endereco.bairro}
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
                    onChange={(value) => setEndereco({ ...endereco, cidade: value })}
                    className="col-span-4"
                />
                <Input
                    inputType="lista"
                    inputLabel="UF"
                    opcoes={estadosBrasil}
                    value={endereco.uf}
                    onChange={(value) => setEndereco({ ...endereco, uf: value })}
                />
            </div>
        </>
    )
}