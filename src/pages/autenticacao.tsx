import { spawn } from "child_process";
import { useState } from "react"
import AuthInput from "../components/auth/AuthInput"
import { IconExclamation } from "../components/icons";

function Autenticacao() {
    const [error, setError] = useState(null);
    const [modo, setModo] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function showError(msg, timeInSec = 5) {
        setError(msg)
        setTimeout(() => setError(null), timeInSec * 1000)
    }

    function submit() {
        if(modo === 'login') {
            console.log('login')
            showError('Ocorreu erro no login')
        } else {
            console.log('cadastrar')
            showError('Ocorreu erro no cadastro')
        }
    }

    return (
        <div className={`flex h-screen items-center justify-center`}>
            <div className={`hidden md:block w-1/2 lg:w-2/3`}>                
                <img src="https://source.unsplash.com/random/web" alt="Imagem da tela de autenticação" className={`h-screen w-full object-cover object-center`} />
            </div>
            <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
                <h1 className={`text-xl font-bold mb-5`}>
                    {modo === 'login' ? 'Entre com a Sua Conta' : 'Cadastre-se na plataforma!'}
                </h1> 

                {error ? (
                    <div className={`bg-red-400 text-white py-3 px-5 my-2 border-2 border-red-700 rounded-lg flex items-center`}>
                        {IconExclamation()}
                        <span className="ml-3">{error}</span>
                    </div>
                ) : false}

                
                <AuthInput label="E-mail"
                    type="email"
                    value={email}
                    valueChange={setEmail}
                    required
                />
                <AuthInput label="Senha"
                    type="password"
                    value={senha}
                    valueChange={setSenha}
                    required
                />

                <button onClick={submit} className={`
                w-full
                bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className={`my-6 border-gray-300`} />

                <button onClick={submit} className={`
                w-full
                bg-red-500 hover:bg-red-400
                text-white rounded-lg px-4 py-3 mt-6
                `}>
                    Entrar com o Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui? 
                        <a onClick={() => setModo('register')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Crie sua conta gratuitamente!</a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade? 
                        <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Entre com as suas credenciais!</a>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Autenticacao