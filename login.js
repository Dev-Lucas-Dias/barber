function validate(){
    const emailValido = isEmailValido();
    document.getElementById('recuperar-senha').disabled=!emailValido;
    document.getElementById('recuperar-senha').style.cursor="pointer";
    document.getElementById('recuperar-senha').style.textDecoration='underline';
    const senhaValid= validSenha();
    document.getElementById('enter').disabled= !emailValido || !senhaValid;
    document.getElementById('enter').style.cursor="pointer";
}



function validSenha(){
    const senha= document.getElementById('senha').value;
    if(!senha){return false}
    return true;

}

function isEmailValido(){
    const email= document.getElementById('email').value;
    if(!email){return false;}
    return validateEmail(email);
}
function validateEmail(email){
    return/\S+@\S+\.\S+/.test(email);
}




/*function login(){
    firebase.auth().singInVithEmailAndPassword
    (container.email().value, container.senha().value)
        .the(response =>{window.location.href="/home.html";
        }).catch(error=>{
            console.log('error',error)
        }); 
}*/