function validateEm(){
    mostraBotao();
    erroEmail();
}
function validateSenha(){
    mostraBotao();
    erroSenha();
}
function erroEmail(){
    const email=document.getElementById('email').value;
    if(!email){
        document.getElementById('email-error').style.display="block";
    }else{
        document.getElementById('email-error').style.display="none";
    }
    if(validateEmail(email)){
        document.getElementById('email-invalid').style.display="none";
    }else{
        document.getElementById('email-invalid').style.display="block";
    }
}
function erroSenha(){
    const senha=document.getElementById('senha').value;
    if(!senha){
        document.getElementById('senha-invalid').style.display="block";
    }else{
        document.getElementById('senha-invalid').style.display="none";
    }
}

function mostraBotao(){
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




function login(){
   firebase.auth().signInWithEmailAndPassword(
    document.getElementById('email').value, document.getElementById('senha').value).then(response =>{
    window.location.href="pages/home/home.html";
   }).catch(error =>{
   alert(error.code);
   });}



function register(){
    window.location.href="pages/register/registro.html"
 }

/*
const form={
    email: ()=> document.getElementById('email'),
    senha: ()=> document.getElementById('senha'),
    emailError: ()=> document.getElementById('email-error'),
    emailInvlaid: ()=> document.getElementById('email-invalid'),
    senhaInvalid : ()=> document.getElementById('senha-invalid'),
    login : ()=> document.getElementById('enter'),
    senhaInvalid : ()=> document.getElementById('recuperar-senha')
}*/