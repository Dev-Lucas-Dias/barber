function sair(){
    firebase.auth().signOut().then(response =>{
        window.location.href= "/index.html";
    }).catch(()=>{
        alert('ERRO AO FAZER LOGOUT!')
    })
}