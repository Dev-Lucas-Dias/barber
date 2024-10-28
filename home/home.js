function sair(){
    firebase.auth().signOut().then(response =>{
        window.location.href= "/index.html";
    }).catch(()=>{
        alert('ERRO AO FAZER LOGOUT!')
    })
}
function marcarHorario(){
    let horario=document.getElementById("container2");
    horario.style.zIndex=1;
}
function fechar(){
    let close=document.getElementById("container2");
    close.style.zIndex=-1;
}
document.getElementById("agenda").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário
  
    // Coleta os dados do formulário
    const formData = new FormData(event.target);
    
    // Transforma os dados em um objeto para enviar como JSON
    const data = Object.fromEntries(formData.entries());
  
    // Envia os dados usando Fetch API
    fetch("https://wa.me/5535997309813", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      document.getElementById("resposta").textContent = "Formulário enviado com sucesso!";
      console.log("Sucesso:", result);
    })
    .catch(error => {
      document.getElementById("resposta").textContent = "Erro ao enviar o formulário.";
      console.error("Erro:", error);
    });
  });