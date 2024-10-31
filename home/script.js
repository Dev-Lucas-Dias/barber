// Inicialização do Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

const dataInput = document.getElementById("data");
const calendario = document.getElementById("calendario");
const diasElemento = document.getElementById("dias");
const mesAnoElemento = document.getElementById("mesAno");
const selectHorario = document.getElementById("horario");
const tempoServicoInput = document.getElementById("tempo");

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
let idAgendamento = "";  // Variável para armazenar o ID do agendamento

dataInput.addEventListener('focus', abrirCalendario);
document.addEventListener("click", (event) => {
  if (!calendario.contains(event.target) && event.target !== dataInput) {
    calendario.style.display = "none";
  }
});

function abrirCalendario() {
  calendario.style.display = "block";
  carregarCalendario(mesAtual, anoAtual);
}

// Carregar dias do mês no calendário
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
function selecionarData(dia, mes, ano) {
  const dataSelecionada = new Date(ano, mes, dia);
  const dataHoje = new Date();
  dataHoje.setHours(0, 0, 0, 0);

  if (dataSelecionada >= dataHoje) {
    dataInput.value = `${String(dia).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}/${ano}`;
    calendario.style.display = "none";
    carregarHorariosDisponiveis(dataInput.value);
  } else {
    alert("Essa data não está disponível!");
  }
}

// Carregar horários disponíveis
async function carregarHorariosDisponiveis(dataSelecionada) {
  selectHorario.innerHTML = "";
  const horariosDisponiveis = gerarHorarios(9, 19, 30);

  for (const horario of horariosDisponiveis) {
    const disponivel = await verificarDisponibilidadeHorario(dataSelecionada, horario);
    if (disponivel) {
      const option = document.createElement("option");
      option.value = horario;
      option.text = horario;
      selectHorario.appendChild(option);
    }
  }
}

function gerarHorarios(inicio, fim, intervalo) {
  const horarios = [];
  for (let h = inicio; h <= fim; h++) {
    for (let m = 0; m < 60; m += intervalo) {
      horarios.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return horarios;
}

async function verificarDisponibilidadeHorario(data, horario) {
  const tempoServico = parseInt(tempoServicoInput.value);
  const agendamentoRef = db.collection('Agendamentos');
  const querySnapshot = await agendamentoRef.where('data', '==', data).get();

  for (const doc of querySnapshot.docs) {
    const { horario: horarioExistente, tempo: tempoExistente } = doc.data();
    const inicioExistente = new Date(`1970-01-01T${horarioExistente}:00`);
    const fimExistente = new Date(inicioExistente.getTime() + tempoExistente * 60000);
    const inicioNovo = new Date(`1970-01-01T${horario}:00`);
    const fimNovo = new Date(inicioNovo.getTime() + tempoServico * 60000);

    if ((inicioNovo >= inicioExistente && inicioNovo < fimExistente) || (fimNovo > inicioExistente && fimNovo <= fimExistente)) {
      return false;  
    }
  }
  return true;
}

// Enviar informações ao Firestore
document.getElementById('agendamentoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const data = dataInput.value;
  const servico = document.getElementById('servicos').value;
  const horario = document.getElementById('horario').value;
  const contato = document.getElementById('contato').value;
  const tempo = parseInt(document.getElementById('tempo').value);

  const agendamentoRef = db.collection('Agendamentos');

  try {
    const docRef = await agendamentoRef.add({
      nome,
      data,
      servico,
      horario,
      contato,
      tempo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    idAgendamento = docRef.id; // Captura o ID do agendamento
    document.getElementById('agendamentoId').innerText = idAgendamento;
    alert("Agendamento realizado com sucesso!");
    
    enviarParaWhatsApp(nome, servico, data, horario);
    document.getElementById('agendamentoForm').reset();
    
  } catch (error) {
    console.error("Erro ao agendar: ", error);
    alert("Erro ao realizar o agendamento. Tente novamente.");
  }
});

// Função para enviar mensagens para WhatsApp
function enviarParaWhatsApp(nome, servico, data, horario) {
  const numeroEstabelecimento = "+5535997309813"; // Insira o número do estabelecimento aqui
  const mensagem = `Olá Barbearia X!, gostaria de realizar um agendamento:\n\nEu sou o ${nome}, marquei um horário para fazer ${servico} \nData: ${data} às ${horario} horas.`;
  const url = `https://api.whatsapp.com/send?phone=${numeroEstabelecimento}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

/// Função para editar agendamento
async function editarAgendamento() {
  const nome = prompt("Digite o nome do cliente cujo agendamento você deseja editar:");

  const agendamentoRef = db.collection('Agendamentos');
  const querySnapshot = await agendamentoRef.where('nome', '==', nome).get();

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Pega o primeiro agendamento encontrado
    const novoNome = prompt("Digite o novo nome:", doc.data().nome);
    const novoServico = prompt("Digite o novo serviço:", doc.data().servico);
    const novoContato = prompt("Digite o novo contato:", doc.data().contato);
    const novaData = prompt("Digite a nova data (dd/mm/yyyy):", doc.data().data);
    const novoHorario = prompt("Digite o novo horário (hh:mm):", doc.data().horario);
    const novoTempo = prompt("Digite o novo tempo (minutos):", doc.data().tempo);
    
    await doc.ref.update({
      nome: novoNome,
      contato: novoContato,
      data: novaData,
      horario: novoHorario,
      serviço: novoServico,
      tempo: parseInt(novoTempo)
    });
    alert("Agendamento atualizado com sucesso!");
    
    enviarParaWhatsApp(novoNome, novoServico, novaData, novoHorario);
   
  } else {
    alert("Agendamento não encontrado para esse nome.");
  }
}

// Função para remover agendamento
async function removerAgendamento() {
  const nome = prompt("Digite o nome do cliente cujo agendamento você deseja remover:");

  const agendamentoRef = db.collection('Agendamentos');
  const querySnapshot = await agendamentoRef.where('nome', '==', nome).get();

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Pega o primeiro agendamento encontrado
    if (confirm("Tem certeza que deseja remover este agendamento?")) {
      await doc.ref.delete();
      alert("Agendamento removido com sucesso!");
      document.getElementById('agendamentoId').innerText = "";
      
      // Mensagem específica para cancelamento
      const mensagemCancelamento = `Olá Barbearia X!, estou cancelando o agendamento que fiz. Desculpe pelo transtorno!`;
      enviarParaWhatsApp("Cancelamento", "", "", mensagemCancelamento);
    }
  } else {
    alert("Agendamento não encontrado para esse nome.");
  }
}

// Função para enviar mensagens de cancelamento para WhatsApp
function enviarParaWhatsApp(tipo, nome = '', servico = '', data = '', horario = '') {
  const numeroEstabelecimento = "+5535997309813"; // Insira o número do estabelecimento aqui
  let mensagem;

  if (tipo === "Cancelamento") {
    mensagem = `Olá Barbearia X!, estou cancelando o agendamento que fiz para ${nome}. Desculpe pelo transtorno!`;
  } else {
    mensagem = `Olá Barbearia X!, gostaria de realizar um agendamento:\n\nEu sou o ${nome}, marquei um horário para fazer ${servico} \nData: ${data} às ${horario} horas.`;
  }

  const url = `https://api.whatsapp.com/send?phone=${numeroEstabelecimento}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
