import React, { useState,useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import Usuarios from "../../server/usuario.json";
import { FiEdit,FiTrash,FiDelete, FiFilePlus } from "react-icons/fi";
import api from "../../server/api";



export default function Listalotacao(){
 

    const [lotacao,setLotacao] = useState([])
    const [empresa,setEmpresa] = useState([]);
    const [patrimonio,setPatrimonio] = useState([]);
    const [setor,setSetor] = useState([]);
    const [usuario,setUsuario] = useState([]);
    useEffect(()=>{
      
       mostrarlista();
    },[])
    
    function dataFormatada(d){
        var data = new Date(d),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    function editar(i){
     window.location.href=`/editarlotacao/${i}`
    }
    function filtranome(id,numero){
        let dadosnovos=[];
        switch(numero){
            case 1:
              dadosnovos=empresa.filter(value=> value.id==id);
              break;
            case 2:
              dadosnovos=patrimonio.filter(value=> value.id==id);
              break;
            case 3:
              dadosnovos=setor.filter(value=> value.id==id);
              break;
            case 4:
              dadosnovos=usuario.filter(value=> value.id==id);
              break

        }
        if(dadosnovos.length>0){
            return dadosnovos[0].nome;
        }else{
            return "nome não identificado"
        }
            
    }
    function mostrarlista(){
        
 
        // let listaUsuarios=JSON.parse(localStorage.getItem("cd-usuarios")||"[]");
        // setUsuario(listaUsuarios);      
        // let listaEmpresas=JSON.parse(localStorage.getItem("cd-empresa")||"[]");
        // setEmpresa(listaEmpresas);      
        // let listaSetor=JSON.parse(localStorage.getItem("cd-setor")||"[]");
        // setSetor(listaSetor);      
        // let listaPatrimonio=JSON.parse(localStorage.getItem("cd-patrimonio")||"[]");
        // setPatrimonio(listaPatrimonio);   
        // let listalotacao=JSON.parse(localStorage.getItem("cd-lotacao")||"[]");
        // setLotacao(listalotacao); 
        
        //qualquer coisa descomenta
        api.get("lotacao")
        .then(function(response){
            console.log(response.data.lotacao)
            setLotacao(response.data.lotacao)
        })


}
        // api.get('/lotacao')
        // .then(res=> {
        //     if(res.status == 200){
        //         setDados(res.data.lotacao);
        //         console.log("Status"+res.status);

        //         console.log(res.data.lotacao);
        //     } else {
        //         console.log("houve um erro na requisição")
        //     }
        // })
        // .catch(function(error) {
        //     console.log(error);
        // });

  

    
    function excluir(i){
        confirmAlert({
            title: 'Excluir Lotação',
            message: `Deseja realmente excluir o cadastro`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => {
                    // let dadosnovos = [];
                    // dadosnovos=lotacao.filter(item =>item.id!==i);
                    // setLotacao(dadosnovos);
                    // localStorage.setItem('cd-lotacao',JSON.stringify(dadosnovos));
                    api.delete(`/lotação/${i}`)
                    .then(res => {});
                    mostrarlista();
                    alert("Dados deletados com sucesso!");
                }
              },
              {
                label: 'Não',
                onClick: () => alert('Click No')
              }
            ]
          })
        }
    return(
        <div className="dashboard-container">
           
           
            <Menu/>
              
            <div className="principal">
                 <Head title ="Lista de Lotação" />
                    <div className="button_new">
                  
                        <a href="/cadastrolotacao">
                                <FiFilePlus 
                                size={24}
                                color="green"
                                cursor="pointer"
        
                        />
                        </a>
               
                    </div>
                    {
                        
                        lotacao.length>0 ?
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Empresa</th>
                            <th>Patrimônio</th>
                            <th>Setor</th>
                            <th>Responsável</th>
                            <th>Data Entrada</th>
                            <th></th>
                            <th></th>
                        </tr>
                     
                            {
                                lotacao.map((lot)=>{
                                    return(
                                    <tr key={lot.toString()}>
                                        <td>{lot.id}</td>
                                        {/* <td>{filtranome(lot.idemp,1)}</td>
                                        <td>{filtranome(lot.idpat,2)}</td>
                                        <td>{filtranome(lot.idset,3)}</td>
                                        <td>{filtranome(lot.idusu,4)}</td> */}
                                        <td>{lot.empresa}</td>
                                        <td>{lot.patrimonio}</td>
                                        <td>{lot.setor}</td>
                                        <td>{lot.usuario}</td>
                                        <td>{dataFormatada(lot.lotacao)}</td>
                                        <td>
                                            <FiEdit
                                            color="blue"
                                            size={18}
                                            cursor="pointer"
                                            onClick={(e)=>editar(lot.id)}
                                            />
                                            
                                        </td>
                                        <td>
                                            <FiDelete
                                            color="red"
                                            size={18}
                                            onClick={(e)=>excluir(lot.id)}
                                            cursor="pointer"
                                            />
                                             
                                            </td>
                                    </tr>
                                    )
                                })
                            }
                        
                    </table>
                           :
                            <table>
                        <tr>
                            <th>Id</th>
                            <th>Empresa</th>
                            <th>Patrimônio</th>
                            <th>Setor</th>
                            <th>Responsável</th>
                            <th></th>
                            <th></th>
                        </tr>
                            </table>
                    }
               </div>
                    
        </div>

)
}