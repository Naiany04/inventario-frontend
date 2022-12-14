import React, { useState } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import api from "../../server/api";
import { useHistory, useParams } from "react-router-dom";

export default function Cadastrousuario() {
    const navigate = useHistory();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confsenha, setConfSenha] = useState('');
    const [msg, setMsg] = useState('');
    const [valida, setValida] = useState(false);
    const dados = {
        nome,
        email,
        senha
    }

    function validarSenha() {

        if (senha !== "") {
            if (senha !== confsenha) {

                setValida(false);
                setMsg("Senhas não conferem!");
            } else {
                setValida(true);
                setMsg("Senhas iguais!");
            }
        } else {
            setValida(false);
            setMsg("Campo senha está vazio");
            setTimeout(() => {
                setMsg('');
            }, 4000);
        }
    }
    //async (forma assincrona)
    async function salvardados(e) {
        e.preventDefault();
        validarSenha();
        if (valida === false) {
            setMsg("Senhas não Conferem!!!");
        } else {

            let index = 0;

            if (nome.length <= 3) {
                setMsg("campo nome precisa ter mais de 3 letras");
                index++;

            } else if (email === "") {
                setMsg("campo email está vazio");
                index++;
            }
            if (index === 0) {
                api.post("usuario",
                    dados,

                    {
                        Headers:
                            { 'Content-Type': 'application/json' }
                    }
                ).then(function (response) {
                    console.log(response.data);

                    alert("Cadastro Salvo com Sucesso!!!!");
                    window.location.href = '/listausuario';
                });

                // localStorage.setItem("cd-usuarios",JSON.stringify(listaUser));
                // alert("Cadastro Salvo com Sucesso!!!!");

            }
        }
    }
    return (
        <div className="dashboard-container">
            <Menu />
            <div className="principal">
                <Head title="Cadastro de Usuário" />
                <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                        <label>Nome</label>
                        <input placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label>Email</label>
                        <input placeholder="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label>Senha</label>
                        <input placeholder="senha" type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                        <label>Confirmar Senha</label>
                        <input placeholder="confirmar senha" type="password"
                            value={confsenha}
                            onKeyUp={validarSenha}
                            onChange={e => setConfSenha(e.target.value)}
                        />
                        <p>{msg}</p>
                        <button className="button_save" type="submit">
                            Salvar
                        </button>

                    </form>
                </section>
            </div>
        </div>

    )
}