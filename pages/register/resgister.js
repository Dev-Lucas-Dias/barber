/*function validateEm(){
    mostraBotao();
    erroEmail();
}*/
function validateEm(){
    const email=all.email().value;
    all.emailError().style.display=email ? "none" : "block";

    all.emailInvalid().style.display=validateEmail(email) ? "none" : "block";
}

function senha(){
    const senha =form.senha().value;
    form.senhaNecess().style.display =senha ? "none" : "block";
    form.senhaInvalid().style.display =validSenha(senha) ? "none" : "block";
}

function validSenha(){
    const senha= all.senha().value;
    if(!senha){return false}
    return true;
}
function validateEmail(email){
    return/\S+@\S+\.\S+/.test(email);
}
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


/*function erroEmail(){
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
}*/