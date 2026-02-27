interface MyButtonProps {
    /** O texto à ser exibido dentro do botão */
    title: string;
    /** Se poderá haver interação com o botão */
    disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
    return (
        <button disabled={disabled}>{title}</button>
    );
}

export default function MyApp() {
    return (
        <div>
            <h1>Bem-vindo ao my app</h1>
            <MyButton title="Eu sou um botão desabilitado" disabled={true} />
        </div>
    );
}