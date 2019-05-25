matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
contator=0;

$('table tr td').click(function () {
  contator++;
  // Pega o conteudo da div clicada
  var conteudo = $(this).html();
  if (conteudo == "") {
    var posicaoJogada = $(this).attr('id');
    if (parseInt(get('jogada')) == 0) {
      $(this).html('<i class="icon-circle-blank"></i>');
      // set(posicaoJogada, 2);
      set('jogada', 1);
      insereNaPossicao(posicaoJogada, 0);
      vereficaGame(0);

    } else {
      $(this).html('<i class="icon-remove"></i>');

      set('jogada', 0);
      insereNaPossicao(posicaoJogada, 1);
      vereficaGame(1);

    }

  }
})

function set(key, dados) {
  sessionStorage.setItem(key, dados);
}

// Função para retornar os dados inseridos
function get(key) {
  return sessionStorage.getItem(key);
}

// Função para limpar todos os dados
function limparDados() {
  sessionStorage.clear();
}

function vereficaGame(dados) {
  //
  if (vereficaLinhas(dados)) {
    if (dados == 0)
      window.alert("Circulo ganhou!!!!");
    else
      window.alert("x ganhou!!!!");

  }
  if (vereficaColunas(dados)) {
    if (dados == 0)
      window.alert("Circulo ganhou!!!!");
    else
      window.alert("x ganhou!!!!");
  }

  if (vereficaDiagnais(dados)) {
    if (dados == 0)
      window.alert("Circulo ganhou!!!!");
    else
      window.alert("x ganhou!!!!");
  }
  if(contator>8 && !vereficaDiagnais(dados) && !vereficaColunas(dados)  && !vereficaDiagnais(dados) ){
    window.alert("ixi de veia!");

  }




  return true;

}


function vereficaLinhas(dados) {
  for (let i = 0; i < 3; i++) {
    if (matriz[i][0] == dados && matriz[i][1] == dados && matriz[i][2] == dados) {
      return true;
    }
  }
  return false;
}


function vereficaColunas(dados) {
  for (let i = 0; i < 3; i++) {
    if (matriz[0][i] == dados && matriz[1][i] == dados && matriz[2][i] == dados) {
      return true;
    }
  }
  return false;
}

function vereficaDiagnais(dados) {
  for (let i = 0; i < 3; i++) {
    if (matriz[0][0] == dados && matriz[1][1] == dados && matriz[2][2] == dados) {
      return true;
    } else {
      if (matriz[0][2] == dados && matriz[1][1] == dados && matriz[2][0] == dados) {
        return true;
      }
    }
  }
  return false;

}

function insereNaPossicao(possicao, valor) {
//  window.alert('teste')
  if (possicao <= 3) {
    matriz[0][possicao - 1] = valor;
  } else {
    if (possicao <= 6) {
      matriz[1][possicao - 1 - 3] = valor;

    } else {
      matriz[2][possicao - 1 - 6] = valor;

    }
  }
  return;

}
