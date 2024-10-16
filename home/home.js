function logout(){
    firebase.auth().singOut().then(()=>{
        window.location.href= "/index.html";
    }).catch(()=>{
        alert('ERRO AO FAZER LOGOUT!')
    })
}