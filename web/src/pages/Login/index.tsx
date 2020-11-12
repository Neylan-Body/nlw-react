import React,{useState, FormEvent} from "react";
import Sidebar from "../../components/Sidebar";
import ScriptTag from 'react-script-tag';
import api from '../../services/api';
import { useHistory } from "react-router-dom";
import { IUser} from '../OrphanagesMap';
import './style.css';
import './script.js';

interface IData {
    [key: string]: any;
}

export default function Login() {
    const [getUser, setUser] = useState<IUser>();
    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] =useState('');

    const history = useHistory();

    async function handleSubmitRegister(event: FormEvent) {
        
        event.preventDefault();
    
        const data1: IData = {
            name: getName,
            email: getEmail,
            password: getPassword,
        }       
    
        try {
    
            await api.post('/save-user', data1);
    
            alert('Usuario cadastrado com sucesso!');
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar Usuário');
        }
    }

    async function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();
    
        const data2: IData = {
            email: getEmail,
            password: getPassword,
        }
    
        try {
            const response = await api.post('/login-user', data2)
    
            alert('Usuario logado com sucesso!');
            setUser({id:response.data.id,
                name:response.data.name,
                email:response.data.email,
                password:response.data.password,
            })
            history.push({
                pathname: '/orphanages',
                state: { id:response.data.id,
                    name:response.data.name,
                    email:response.data.email,
                    password:response.data.password,
                }
            });
        } catch (error) {
            console.log(error);
            alert('Erro ao logar Usuário');
        }
    }

    return (
        <div id="page-login">
            <Sidebar />
                <div className="container">
                    <div className="content first-content">
                        <div className="first-column">
                            <h2 className="title title-primary">Bem vindo novamente!</h2>
                            <p className="description description-primary">Para se manter conectado conosco</p>
                            <p className="description description-primary">por favor faça o login com suas informações pessoais</p>
                            <button id="signin" onClick={() => {var body = document.querySelector("body");if(body)body.className = "sign-in-js";}} className="btn btn-primary">sign in</button>
                        </div>
                        <div className="second-column">
                            <h2 className="title title-second">criar um conta</h2>
                            <p className="description description-second">ou use seu e-mail para o cadastro:</p>
                            <form action="save-user" method="post" onSubmit={handleSubmitRegister} className="form" id="register-form">
                                <label className="label-input" htmlFor="name-sign-up">
                                    <i className="far fa-user icon-modify"></i>
                                    <input type="text" name="name-sign-up" id="name-sign-up" value={getName} onChange={(event) => setName(event.target.value)} placeholder="Nome" data-required data-only-letters data-min-length="3" data-max-length="16"/>                                
                                
                                </label>
                                <label className="label-input" htmlFor="email-sign-up">
                                    <i className="far fa-envelope icon-modify"></i>
                                    <input type="email"  name="email-sign-up" id="email-sign-up" value={getEmail} onChange={(event) => setEmail(event.target.value)} placeholder="Email" data-min-length="2" data-email-validate/>
                                </label>
                                <label className="label-input" htmlFor="password-sign-up">
                                    <i className="fas fa-lock icon-modify"></i>
                                    <input type="password"  name="password-sign-up" id="password-sign-up" value={getPassword} onChange={(event) => setPassword(event.target.value)} placeholder="Senha" data-password-validate data-required/>
                                </label>
                                <button  id="btn-submit-register" className="btn btn-second" type="submit">sign up</button>
                            </form>
                        </div>
                    </div>
                    <div className="content second-content">
                        <div className="first-column">
                            <h2 className="title title-primary">Olá, amigo!</h2>
                            <p className="description description-primary">Insira seus dados pessoais</p>
                            <p className="description description-primary">e comece a jornada conosco</p>
                            <button id="signup" onClick={() => {var body = document.querySelector("body");if(body)body.className = "sign-up-js";}} className="btn btn-primary">sign up</button>
                        </div>
                        <div className="second-column">
                            <h2 className="title title-second">Entrar</h2>
                            <p className="description description-second">ou use o seu e-mail:</p>
                            <form className="form" action="/orphanages" method="post" onSubmit={handleSubmitLogin} id="login-form">
                                <label className="label-input" htmlFor="">
                                    <i className="far fa-envelope icon-modify"></i>
                                    <input type="email" placeholder="Email" name="email-sign-in" id="email-sign-in" value={getEmail} onChange={(event) => setEmail(event.target.value)} data-min-length="2" data-email-validate/>
                                </label>
                                <label className="label-input" htmlFor="">
                                    <i className="fas fa-lock icon-modify"></i>
                                    <input type="password" placeholder="Senha" name="password-sign-in" id="password-sign-in" value={getPassword} onChange={(event) => setPassword(event.target.value)} data-password-validate data-required/>
                                </label>    
                                <a className="password" href="/forgot-password">Esqueceu a senha?</a>
                                <button id="btn-submit-login" className="btn btn-second" type="submit">sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
                <p className="error-validation template"></p>
                <ScriptTag src="script.js" />
        </div>
    );
}
