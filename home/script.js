// script.js

const dataInput = document.getElementById("data");
const calendario = document.getElementById("calendario");
const diasElemento = document.getElementById("dias");
const mesAnoElemento = document.getElementById("mesAno");

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

// Abre o calendário
dataInput.addEventListener('focus', abrirCalendario);
document.addEventListener("click", (event) => {
  if (!calendario.contains(event.target) && event.target !== dataInput) {
    calendario.style.display = "none";
  }
});

// Carrega o calendário
function abrirCalendario() {
  calendario.style.display = "block";
  carregarCalendario(mesAtual, anoAtual);
}

function carregarCalendario(mes, ano) {
  const diasDoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  diasElemento.innerHTML = "";

  const nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  mesAnoElemento.innerText = `${nomeMes[mes]} ${ano}`;

  for (let i = 0; i < primeiroDia; i++) diasElemento.appendChild(document.createElement("span"));
  for (let dia = 1; dia <= diasDoMes; dia++) {
    const diaElemento = document.createElement("span");
    diaElemento.innerText = dia;
    diaElemento.onclick = () => selecionarData(dia, mes, ano);
    if (dia === new Date().getDate() && mes === new Date().getMonth() && ano === new Date().getFullYear()) diaElemento.classList.add("hoje");
    diasElemento.appendChild(diaElemento);
  }
}

function alterarMes(valor) {
  mesAtual = (mesAtual + valor + 12) % 12;
  anoAtual += (mesAtual === 0 && valor === 1) ? 1 : (mesAtual === 11 && valor === -1) ? -1 : 0;
  carregarCalendario(mesAtual, anoAtual);
}

// Seleciona a data
const dataHoje = new Date();
dataHoje.setHours(0, 0, 0, 0);

function selecionarData(dia, mes, ano) {
  const dataSelecionada = new Date(ano, mes, dia);
  if (dataSelecionada >= dataHoje) {
    dataInput.value = `${String(dia).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}/${ano}`;
    calendario.style.display = "none";
  } else {
    alert("Essa data não está disponível!");
  }
}

// Gera horários
function gerarHorarios(inicio, fim, intervalo) {
  const horarios = [];
  for (let h = inicio; h <= fim; h++) {
    for (let m = 0; m < 60; m += intervalo) {
      horarios.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return horarios;
}

// Popula o select com os horários
document.addEventListener("DOMContentLoaded", () => {
  const selectHorario = document.getElementById("horario");
  gerarHorarios(9, 19, 60).forEach(horario => {
    const option = document.createElement("option");
    option.value = horario;
    option.text = horario;
    selectHorario.appendChild(option);
  });
});

// Mostra valor do serviço
function mostrarValorServico() {
  const valor = parseFloat(document.getElementById("servicos").value) || 0;
  document.getElementById("valorServico").innerText = `Valor: R$ ${valor.toFixed(2)}`;
}

// Agendamento
document.getElementById('agendamentoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const data = dataInput.value;
  const servico = document.getElementById('servicos').value;
  const horario = document.getElementById('horario').value;
  const contato = document.getElementById('contato').value;
  const tempo = parseInt(document.getElementById('tempo').value);
  const agendamentoRef = db.collection('Agendamentos');

  // Verifica se o horário está disponível
  let horarioDisponivel = true;
  const querySnapshot = await agendamentoRef.where('data', '==', data).where('horario', '==', horario).get();
  
  querySnapshot.forEach((doc) => {
    const { horario: horarioExistente, tempo: tempoExistente } = doc.data();
    const inicioExistente = new Date(`1970-01-01T${horarioExistente}:00`);
    const fimExistente = new Date(inicioExistente.getTime() + tempoExistente * 60000);
    const inicioNovo = new Date(`1970-01-01T${horario}:00`);
    const fimNovo = new Date(inicioNovo.getTime() + tempo * 60000);
    if ((inicioNovo >= inicioExistente && inicioNovo < fimExistente) || (fimNovo > inicioExistente && fimNovo <= fimExistente)) {
      horarioDisponivel = false;
    }
  });

  if (!horarioDisponivel) {
    alert("Este horário está ocupado. Escolha outro horário.");
    return;
  }

  // Salvar agendamento no Firestore
  try {
    const docRef = await agendamentoRef.add({ nome, data, servico, horario, contato });
    document.getElementById('agendamentoId').innerText = docRef.id;
    alert("Agendamento realizado com sucesso!");
    enviarWhatsApp(nome, data, servico, horario); // Envio para WhatsApp
    document.getElementById('agendamentoForm').reset();
  } catch (error) {
    console.error("Erro ao agendar: ", error);
    alert("Erro ao realizar o agendamento. Tente novamente.");
  }
});

// Envio para WhatsApp
function enviarWhatsApp(nome, data, servico, horario) {
  const numeroWhatsApp = "5535997309813"; // Substitua pelo número desejado
  const mensagem = `Novo Agendamento:\nNome: ${nome}\nData: ${data}\nServiço: ${servico}\nHorário: ${horario}`;
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Funções para editar e remover agendamento
async function editarAgendamento() {
  const id = prompt("Informe o ID do agendamento para editar:");
  if (!id) return;

  const nome = document.getElementById('nome').value;
  const data = dataInput.value;
  const servico = document.getElementById('servicos').value;
  const horario = document.getElementById('horario').value;

  try {
    await db.collection('agendamentos').doc(id).update({ nome, data, servico, horario });
    alert("Agendamento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao editar agendamento: ", error);
    alert("Erro ao editar o agendamento.");
  }
}

async function removerAgendamento() {
  const id = prompt("Informe o ID do agendamento para remover:");
  if (!id) return;

  try {
    await db.collection('agendamentos').doc(id).delete();
    alert("Agendamento removido com sucesso!");
  } catch (error) {
    console.error("Erro ao remover agendamento: ", error);
    alert("Erro ao remover o agendamento.");
  }
}
