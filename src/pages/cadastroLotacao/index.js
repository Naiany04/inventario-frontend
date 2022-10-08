import React,{useEffect, useState} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import api from "../../server/api";
import { useHistory, useParams } from "react-router-dom";


export default function Cadastrolotacao(){
  
    const navigate = useHistory();
    const [idusu,setIusu] = useState("");
    const [idemp,setIemp] = useState("");
    const [idpat,setPat] = useState("");
    const [idset,setSet] = useState("");
    const [lotacao,setLotacao] = useState()
    const [empresa,setEmpresa] = useState([]);
    const [patrimonio,setPatrimonio] = useState([]);
    const [setor,setSetor] = useState([]);
    const [usuario,setUsuario] = useState([]);
    const dados={
        idusu,
        idemp,
        idpat,
        idset,
        lotacao
    }
    const [msg,setMsg]=useState('');
    const [valida,setValida] = useState(false);
     useEffect(()=>{
                montarselects();
     },[])

    function montarselects(){
        // let listaUsuarios=JSON.parse(localStorage.getItem("cd-usuario")||"[]");
        // setUsuario(listaUsuarios);      
        // let listaEmpresas=JSON.parse(localStorage.getItem("cd-empresa")||"[]");
        // setEmpresa(listaEmpresas);      
        // let listaSetor=JSON.parse(localStorage.getItem("cd-setor")||"[]");
        // setSetor(listaSetor);      
        // let listaPatrimonio=JSON.parse(localStorage.getItem("cd-patrimonio")||"[]");
        // setPatrimonio(listaPatrimonio);   
        api.get('/usuario')
        .then(res=> {
            if(res.status == 200){
                setUsuario(res.data.usuario);
                console.log("Status"+res.status);

                console.log(res.data.usuario);
            } else {
                console.log("houve um erro na requisição")
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        api.get('/empresa')
        .then(res=> {
            if(res.status == 200){
                setEmpresa(res.data.empresa);
                console.log("Status"+res.status);

                console.log(res.data.empresa);
            } else {
                console.log("houve um erro na requisição")
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        api.get('/patrimonio')
        .then(res => {
            if (res.status == 200) {
                setPatrimonio(res.data.patrimonio);
                console.log("Status" + res.status);

                console.log(res.data.patrimonio);
            } else {
                console.log("houve um erro na requisição")
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        api.get('/setor')
        .then(res=> {
            if(res.status == 200){
                setSetor(res.data.setor);
                console.log("Status"+res.status);

                console.log(res.data.setor);
            } else {
                console.log("houve um erro na requisição")
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        api.get("lotacao")
        .then(function(response){
            console.log(response.data.lotacao)
            setLotacao(response.data.lotacao)
        })

    }


    function salvardados(e){
        e.preventDefault();

                                let index=0;
                            
                                if(idemp===0){
                                    setMsg("campo empresa  está vazio");
                                    index++;
                                }else if(idset===0){
                                    setMsg("campo setor  está vazio");
                                    index++;
                                
                                }else if(idusu===0){
                                    setMsg("campo usuário  está vazio");
                                    index++;
                                
                                }else if(idpat===0){
                                    setMsg("campo patrimônio  está vazio");
                                    index++;
                                }
                                
            if(index===0){
               
                // let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao")||"[]")
            
                // listaLotacao.push(
                //     {
                //         id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                //         idemp:idemp,
                //         idpat:idpat,
                //         idset:idset,
                //         idusu:idusu,
                //         lotacao:lotacao
                //     }
                // )
                // localStorage.setItem("cd-lotacao",JSON.stringify(listaLotacao));
                // alert("Cadastro Salvo com Sucesso!!!!");
                // window.location.href="/listalotacao";

                api.post("lotacao",
                dados,

                {
                    Headers: 
                    {'Content-Type': 'application/json'}
                }                
                ).then(function (response){
                    console.log(response.data);

                    alert("Cadastro Salvo com Sucesso!!!!");
                    window.location.href='/listalotacao';
                });

            }  
    
}
    return(
        <div className="dashboard-container">
            <Menu/>
            <div className="principal">
                 <Head title ="Cadastro de Lotações" />
                 <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                    <label>Empresa {idusu}</label>
                        <select value={idemp} onChange={e=>setIemp(e.target.value)}>
                        <option></option>
                        {empresa.map((emp)=>{
                                    return(
                                        <option value={emp.id}>{emp.nome}</option>        
                                    )})
                        }  
                        </select >
                        <label>Patrimônio</label>
                        <select  value={idpat} onChange={e=>setPat(e.target.value)} >
                        <option></option>
                        {patrimonio.map((pat)=>{
                                    return(
                                        <option value={pat.id}>{pat.nome}</option>        
                                    )})
                        }  
                        </select>
                        <label>Setor</label>
                        <select  value={idset} onChange={e=>setSet(e.target.value)}>
                        <option></option>
                        {setor.map((set)=>{
                                    return(
                                        <option value={set.id}>{set.nome}</option>        
                                    )})
                        }  
                        </select>
                        <label>Responsável</label>
                        <select  value={idusu} onChange={e=>setIusu(e.target.value)}>
                        <option></option>
                        {usuario.map((usu)=>{
                                    return(
                                        <option value={usu.id}>{usu.nome}</option>        
                                    )})
                        }  
                        </select>

                        <label>Data da Lotação</label>
                        <input 
                        type="date"
                        value={lotacao}
                        onChange={e=>setLotacao(e.target.value)}
                        />
                    <p>{msg}</p>-
                        <button className="button_save" type="submit">
                            Salvar
                        </button>
                     
                    </form>
            </section>
            </div> 
        </div>

)
}