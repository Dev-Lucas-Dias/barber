function validateEm(){
    mostraBotao();
    erroEmail();
}
function validateSenha(){
    mostraBotao();
    erroSenha();
}

const all = {
    email: () => document.getElementById("email"),
    senha: () => document.getElementById("senha"),
    emailError: () => document.getElementById("email-error"),
    emailInvalid: () => document.getElementById("email-invalid"),
    senhaInvalid : () => document.getElementById("senha-invalid"),
    login : () => document.getElementById("enter"),
    senhaRecover : () => document.getElementById("recuperar-senha")
}
function erroEmail(){
    const email=all.email().value;
    if(!email){
        all.emailError().style.display="block";
    }else{
        all.emailError().style.display="none";
    }
    if(validateEmail(email)){
        all.emailInvalid().style.display="none";
    }else{
        all.emailInvalid().style.display="block";
    }
}
function erroSenha(){
    const senha=all.senha().value;
    if(!senha){
        all.senhaInvalid().style.display="block";
    }else{
        all.senhaInvalid().style.display="none";
    }
}

function mostraBotao(){
    const emailValido = isEmailValido();
    all.senhaRecover().disabled=!emailValido;
    all.senhaRecover().style.cursor="pointer";
    all.senhaRecover().style.textDecoration='underline';
   
    const senhaValid= validSenha();
    all.login().disabled= !emailValido || !senhaValid;
    all.login().style.cursor="pointer";
}


function validSenha(){
    const senha= all.senha().value;
    if(!senha){return false}
    return true;
}

function isEmailValido(){
    const email= all.email().value;
    if(!email){return false;}
    return validateEmail(email);
}
function validateEmail(email){
    return/\S+@\S+\.\S+/.test(email);
}

function login(){
    loading();
   firebase.auth().signInWithEmailAndPassword(
    all.email().value, all.senha().value).then(response =>{
        hideLoading()
    window.location.href="pages/home/home.html";
   }).catch(error =>{
    hideLoading();
   alert(messageError(error));
   });}
function messageError(error){
    if(error.code== "auth/invalid-credential"){
        return"Usuário não encontrado";
    }
return error.message;
}
function recover(){
    loading();
   firebase.auth().sendPasswordResetEmail(all.email().value).then(response=>{
        hideLoading();
        alert("Email enviado com sucesso");
    }).catch(error =>{
        hideLoading();
        alert(messageError(error));
    });

}

function register(){
window.location.href="pages/register/registro.html"
 }


