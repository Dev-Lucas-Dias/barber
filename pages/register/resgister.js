function validateEm(){
    mostraBotao();
    erroEmail();
}

const all = {
    email: () => document.getElementById("email"),
    senha: () => document.getElementById("senha"),
    emailError: () => document.getElementById("email-error"),
    emailInvalid: () => document.getElementById("email-invalid"),
    senhaInvalid : () => document.getElementById("senha-invalid"),
    login : () => document.getElementById("enter"),
    senhaRecover : () => document.getElementById("recuperar-senha")}

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
function isEmailValido(){
    const email= all.email().value;
    if(!email){return false;}
    return validateEmail(email);
}
function validateEmail(email){
    return/\S+@\S+\.\S+/.test(email);
}