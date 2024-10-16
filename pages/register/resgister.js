/*function validateEm(){
    mostraBotao();
    erroEmail();
}*/

const all = {
    email: () => document.getElementById("email"),
    senha: () => document.getElementById("senha"),
    confirmSenha : () => document.getElementById("confirmar-senha"),
    emailError: () => document.getElementById("email-error"),
    emailInvalid: () => document.getElementById("email-invalid"),
    senhaInvalid : () => document.getElementById("senha-invalid"),
    senhaNecess : () => document.getElementById("senha-necessaria"),
    senhaIgual : () => document.getElementById("senha-igual"),
    login : () => document.getElementById("enter"),
    register : () => document.getElementById("register"),
    senhaObri : () => document.getElementById("senha-obri")}


function validateEm(){
    const email=all.email().value;
    all.emailError().style.display=email ? "none" : "block";
    all.emailInvalid().style.display=validateEmail(email) ? "none" : "block";
    register()
}
function validarSenha(){
    const senha =all.senha().value;
    all.senhaInvalid().style.display = senha.length>=6 ? "none" : "block";
   all.senhaNecess().style.display = senha ?"none" : "block";
   validateSenhaIgual();
   register()
}
function confirmarSenha(){
    validateSenhaIgual();
    register()
}
 function validateSenhaIgual(){
    const senha = all.senha().value;
    const confirmSenha = all.confirmSenha().value;
    all.senhaIgual().style.display= senha==confirmSenha ? "none" : "block";
 }

 function register(){
    all.register().disabled=allValid();
 }

function allValid(){
    const email = all.email().value;
    if(!email|| !validateEmail(email)){
        return false;
        
    }all.register().style.cursor="pointer";
    const senha = all.senha().value;
    if(!senha||senha.length<6){
    return false;
    } all.register().style.cursor="pointer";
    const confirmaSenha = all.confirmSenha();
    if(senha !=confirmaSenha){
        return false;
    } all.register().style.cursor="pointer";
    return true;
   
}
function registerLogin(){
    loading()
    const emailLogin = all.email().value;
    const senhaLogin =all.senha().value;
    //cria um novo login no firebase auth
    firebase.auth().createUserWithEmailAndPassword(emailLogin, senhaLogin).then(()=>{
        hideLoading();
        window.location.href="/home/home.html";
    }).catch(error =>{
        alert(messageError(error));
   });}
function messageError(error){
    if(error.code== "auth/email-already-in-use"){
        return"Email já existente!";
    }}
 function voltar(){
    loading()
    window.location.href="/index.html";
    hideLoading();
 }
 firebase.auth().onAuthStateChanged(function(user){
    if (user){ window.location.href= "/home/home.html";}
})