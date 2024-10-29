// script.js

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
const dataInput = document.getElementById("data");
const calendario = document.getElementById("calendario");
const diasElemento = document.getElementById("dias");
const mesAnoElemento = document.getElementById("mesAno");

// Abre o calendário ao clicar no campo
function abrirCalendario() {
  calendario.style.display = "block";
  carregarCalendario(mesAtual, anoAtual);
}

// Fecha o calendário ao clicar fora
document.addEventListener("click", function(event) {
  if (!calendario.contains(event.target) && event.target !== dataInput) {
    calendario.style.display = "none";
  }
});

// Carrega o calendário com o mês e ano atual
function carregarCalendario(mes, ano) {
  const diasDoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  diasElemento.innerHTML = "";

  // Exibe mês e ano
  const nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  mesAnoElemento.innerText = `${nomeMes[mes]} ${ano}`;

  // Preenche os dias do calendário
  for (let i = 0; i < primeiroDia; i++) {
    const espaco = document.createElement("span");
    diasElemento.appendChild(espaco);
  }
  for (let dia = 1; dia <= diasDoMes; dia++) {
    const diaElemento = document.createElement("span");
    diaElemento.innerText = dia;
    diaElemento.onclick = () => selecionarData(dia, mes, ano);
    if (dia === new Date().getDate() && mes === new Date().getMonth() && ano === new Date().getFullYear()) {
      diaElemento.classList.add("hoje");
    }
    diasElemento.appendChild(diaElemento);
  }
}

// Navegação entre meses
function alterarMes(valor) {
  mesAtual += valor;
  if (mesAtual < 0) {
    mesAtual = 11;
    anoAtual--;
  } else if (mesAtual > 11) { 
    mesAtual = 0;
    anoAtual++;
  }
  carregarCalendario(mesAtual, anoAtual);
}
//Somente pode escolher data depois do dia atual

const dataHoje = new Date(); // Data de hoje
dataHoje.setHours(0, 0, 0, 0); // Define a hora para 00:00:00 para evitar problemas de comparação

function selecionarData(dia, mes, ano) {
  // Cria uma nova data com a seleção do usuário
  const dataSelecionada = new Date(ano, mes, dia);
  dataSelecionada.setHours(0, 0, 0, 0); // Define a hora para 00:00:00 para comparação exata

  // Verifica se a data selecionada é igual à data de hoje
  if (dataSelecionada.getTime() >= dataHoje.getTime()) {
    dataInput.value = `${String(dia).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}/${ano}`;
    calendario.style.display = "none";
  } else {
    alert("Essa data não esta disponive!")
  }
}


function gerarHorarios(inicio, fim, intervalo) {
  const horarios = [];
  let horaAtual = new Date();
  horaAtual.setHours(inicio, 0, 0, 0); // Define a hora inicial

  const horaFim = new Date();
  horaFim.setHours(fim, 0, 0, 0); // Define a hora final

  // Gera os horários com base no intervalo
  while (horaAtual <= horaFim) {
    const horas = String(horaAtual.getHours()).padStart(2, "0");
    const minutos = String(horaAtual.getMinutes()).padStart(2, "0");
    horarios.push(`${horas}:${minutos}`);
    horaAtual.setMinutes(horaAtual.getMinutes() + intervalo); // Incrementa pelo intervalo
  }

  return horarios;
}

// Popula o select com os horários
function popularSelectHorarios() {
  const selectHorario = document.getElementById("horario");
  const horarios = gerarHorarios(9, 19, 30); // Exemplo: 8h às 18h com intervalos de 30 min

  horarios.forEach(horario => {
    const option = document.createElement("option");
    option.value = horario;
    option.text = horario;
    selectHorario.appendChild(option);
  });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", popularSelectHorarios);



 function mostrarValorServico() {
      // Obtém o valor do serviço selecionado
      const select = document.getElementById("servicos");
      const valor = select.value;
      
      // Exibe o valor correspondente no parágrafo
      const valorServico = document.getElementById("valorServico");
      if (valor) {
        valorServico.innerText = `Valor: R$ ${parseFloat(valor).toFixed(2)}`;
      } else {
        valorServico.innerText = "Valor: R$ 0,00";
      }
    }


      // Exibe o valor total formatado
      const valorTotalElemento = document.getElementById("valorTotal");
      valorTotalElemento.innerText = `Valor Total: R$ ${valorTotal.toFixed(2)}`;