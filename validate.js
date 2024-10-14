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