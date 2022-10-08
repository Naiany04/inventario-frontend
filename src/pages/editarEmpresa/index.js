import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import { FiEdit,FiTrash,FiDelete, FiFilePlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import api from "../../server/api";
import Usuarios from '../../server/usuario.json';


export default function Editarempresa(){
    const {idempresa} =useParams();
    const [nome,setNome] = useState('');
    const [responsavel,setResponsavel] = useState('');
    const [contato,setContato] = useState('');
    const [msg,setMsg] = useState("");
    const dados={
        id: idempresa,
        nome,
        responsavel,
        contato
    }
    const headers = {
        'Content-Type' : 'application/json'
    };

    
    useEffect(()=>{
       mostrarDados();
    },[])

            function mostrarDados(){
                // let listaEmp =JSON.parse(localStorage.getItem("cd-empresa"));
                //     listaEmp.
                //         filter(value => value.id ==idempresa).
                //         map(value => {
                //             setNome(value.nome);
                //             setResponsavel(value.responsavel);
                
                // }
            
                //     );]

                api.get(`/empresa/${idempresa}`)
                .then(res=> {
                
                    if(res.status == 200){
                        let resultado=res.data.empresa;
                        
                            setNome(resultado[0].nome);
                            setResponsavel(resultado[0].responsavel);
                            setContato(resultado[0].contato);
                    } else {
                        console.log("houve um erro na requisição")
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
                

            }


    function salvardados(e){
        e.preventDefault();
 
                                let index=0;
                            
                                if(nome.length<=3){
                                    setMsg("campo nome precisa ter mais de 3 letras");
                                    index++;

                                }else if(responsavel===""){
                                    setMsg("campo responsavel está vazio");
                                    index++;
                                }
            if(index===0){
                // let listaEmp = JSON.parse(localStorage.getItem("cd-empresa"));
                // listaEmp.map((item)=>{
                //     if(item.id==idempresa){
                //         item.nome=nome;
                //         item.responsavel=responsavel;
                //     }

                api.patch("empresa", 
                dados,

                {
                    Headers: 
                    {'Content-Type': 'application/json'}
                }                
                ).then(function (response){
                    console.log(response.data);

                    alert("Cadastro Salvo com Sucesso!!!!");
                    window.location.href='/listaempresa';
                });
                // localStorage.setItem("cd-empresa",JSON.stringify(listaEmp))
                // alert("Dados Salvos com sucesso!")
                // window.location.href="/listaempresa";
            }
    
}
    return(
        <div className="dashboard-container">
            <Menu/>
            <div className="principal">
                 <Head title ="Editar Usuário" />
                 <section className="form-cadastro">
                    <form onSubmit={salvardados} >
                    
                        <label>Nome</label>
                        
                        <input placeholder="Nome"
                        value={nome}
                        onChange={e=>setNome(e.target.value)}
                        />
                        <label>Responsável</label>
                        <input placeholder="Responsável"
                        type="text"
                        value={responsavel}
                        onChange={e=>setResponsavel(e.target.value)}
                        />
                        <label>Contato</label>
                        <input placeholder="Contato"
                        type="text"
                        value={contato}
                        onChange={e=>setContato(e.target.value)}
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