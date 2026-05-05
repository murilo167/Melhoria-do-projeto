const pecas = document.querySelectorAll(".peca");
const contadorTexto = document.getElementById("contador");
const mensagemFinal = document.getElementById("mensagemFinal");
const botaoReset = document.getElementById("reset");

// 👉 ALTERA AQUI O LIMITE (2 ou 3)
const LIMITE = 3;

// controle de estado
let desbloqueadas = [false, false, false, false];

pecas.forEach((peca, index) => {

  peca.addEventListener("click", () => {

    const ativasAgora = desbloqueadas.filter(v => v).length;

    // 🚫 BLOQUEIO TOTAL
    if (!desbloqueadas[index] && ativasAgora >= LIMITE) {
      mensagemFinal.textContent = "⚠️ Limite atingido!";
      alert("Você já atingiu o limite!");
      return;
    }

    const icone = peca.querySelector(".icone");
    const texto = peca.querySelector(".texto");

    const emojis = ["✨", "⚡", "🔥", "🚀"];

    // 🔁 TOGGLE (ativa/desativa)
    if (desbloqueadas[index]) {

      // desativa
      peca.classList.remove("ativa");
      peca.classList.add("bloqueada");

      icone.textContent = "🔒";
      texto.textContent = "Clique para desbloquear";

      desbloqueadas[index] = false;

    } else {

      // ativa
      peca.classList.add("ativa");
      peca.classList.remove("bloqueada");

      icone.textContent = emojis[index];
      texto.textContent = "Desbloqueado!";

      desbloqueadas[index] = true;
    }

    // 📊 CONTADOR
    const total = desbloqueadas.filter(v => v).length;
    contadorTexto.textContent = total;

    // 🏆 VITÓRIA
    if (desbloqueadas.every(v => v)) {
      mensagemFinal.textContent = "🎉 Você venceu!";
    } else if (total >= LIMITE) {
      mensagemFinal.textContent = "⚠️ Limite atingido!";
    } else {
      mensagemFinal.textContent = "";
    }

  });

  // evita bug no botão interno
  const botao = peca.querySelector(".btn-abrir");
  if (botao) {
    botao.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

});


// 🔄 BOTÃO RESET
if (botaoReset) {
  botaoReset.addEventListener("click", () => {

    desbloqueadas = [false, false, false, false];

    pecas.forEach((peca) => {
      peca.classList.remove("ativa");
      peca.classList.add("bloqueada");

      peca.querySelector(".icone").textContent = "🔒";
      peca.querySelector(".texto").textContent = "Clique para desbloquear";
    });

    contadorTexto.textContent = 0;
    mensagemFinal.textContent = "";

  });
}