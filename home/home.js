function sair(){
    firebase.auth().signOut().then(response =>{
        window.location.href= "/index.html";
    }).catch(()=>{
        alert('ERRO AO FAZER LOGOUT!')
    })
}
function marcarHorario(){
    let horario=document.getElementById("container2");
    horario.style.zIndex=1;
}
function fechar(){
    let close=document.getElementById("container2");
    close.style.zIndex=-1;
}