import React,{useState,useEffect} from "react";
import '../../global.css';
import './styles.css';

import Menu from "../../componentes/Menu";

useEffect(()=>{
    alert("estou aqui")
        verificarsession();
  },[])
  function verificarsession(){

    let session =JSON.parse(sessionStorage.getItem("session")|| "[]");
    alert(session);
    if(session.length==0){
      window.location.href="/";
    }
    console.log(session.nome);
    setDados(session);
   
      // else{
    //      alert("você não tem autorização para acessar esse modulo")
    // }
}
export default function Dashboard(){
    return(
            <div className="dashboard-container">
                {/* <p>Estou no Dashboard</p> */}
               
                <Menu/>
                  
                <div className="principal">
                        <p>Principal</p>
                </div>
                        
            </div>
  
    )
}