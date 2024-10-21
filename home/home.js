function sair(){
    firebase.auth().singOut().then(response =>{
        window.location.href= "/index.html";
    }).catch(()=>{
        alert('ERRO AO FAZER LOGOUT!')
    })
}