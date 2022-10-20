import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import { FiEdit,FiTrash,FiDelete, FiFilePlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import api from "../../server/api";
import Usuarios from '../../server/usuario.json';


export default function Editarusuario(){
    const {idsetor} =useParams();
    const [nome,setNome] = useState('');
    const [msg,setMsg]=useState('');
    const dados={
        id: idsetor,
        nome,
    }
    const headers = {
        'Content-Type' : 'application/json'
    };
    
    useEffect(()=>{
       mostrarDados();
    },[])

            function mostrarDados(){
                // let listaUser =JSON.parse(localStorage.getItem("cd-usuarios"));
                //     listaUser.
                //         filter(value => value.id ==idusuario).
                //         map(value => {
                //             setNome(value.nome);
                //             setEmail(value.email);
                //             setSenha(value.senha);
                //             setConfSenha(value.senha);
                
                // }
                // );

                api.get(`/setor/${idsetor}`)
                .then(res=> {
                
                    if(res.status == 200){
                        let resultado=res.data.setor;
                        
                            setNome(resultado[0].nome);

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

        // if(valida===false){
        //     setMsg("Senhas não Conferem!!!");
        // }else{

                                let index=0;
                            
        //                         if(nome.length<=3){
        //                             setMsg("campo nome precisa ter mais de 3 letras");
        //                             index++;

        //                         }else if(email===""){
        //                             setMsg("campo email está vazio");
        //                             index++;
        //                         }
            if(index===0){
                api.patch("setor", 
                dados,

                {
                    Headers: 
                    {'Content-Type': 'application/json'}
                }                
                ).then(function (response){
                    console.log(response.data);

                    alert("Cadastro Salvo com Sucesso!!!!");
                    window.location.href='/listasetor';
                });
                
            
    }
}
    return(
        <div className="dashboard-container">
            <Menu/>
            <div className="principal">
                 <Head title ="Editar Setor" />
                 <section className="form-cadastro">
                    <form onSubmit={salvardados} >
                    
                        <label>Nome</label>
                        
                        <input placeholder="Nome"
                        value={nome}
                        onChange={e=>setNome(e.target.value)}
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