//variaveis gerais
var pNumSorteados = document.getElementById("paragrafoNumSorteados");
var pNumSelec = document.getElementById("paragrafoNumSelecionados");
var resultado = document.getElementById("resultado");
var sortear = document.getElementById("btnSortear");
var vNumSelect = [];//Vetor com os números selecionados
var vNumSorteados = [];//Vetor com os números sortados

criarCenario();

function criarCenario() {

    var cenario = document.getElementById("cenario");
    var cont = 1;

    // div com as class "row" - Como usarei 6 linhas, precisarei de 6 div.row
    // div com class "col" - Como usarei 10 colunas, precisarei de 60 div.col
    //Usarei uma estrutura de repetição de 1 a 66 e separar com estruturas seletivas
    for (var index = 1; index <= 70; index++) {
        if (index == 1 || index == 8 || index == 15 || index == 22 || index == 29 || index == 36 || index == 43 || index == 50 || index == 57 || index == 64) {
            //div.row
            var divRow = document.createElement("div");
            divRow.setAttribute('class', 'row');
            cenario.appendChild(divRow);
        }
        else {
            // div.col
            var divCol = document.createElement("div");
            divCol.setAttribute('class', 'col');
            divRow.appendChild(divCol);

            // label 
            var label = document.createElement("label");
            label.setAttribute('class', 'form-check-label')
            divCol.appendChild(label);

            // checkbox
            var checkBox = document.createElement("input");
            checkBox.setAttribute('value', cont)
            checkBox.setAttribute('id', 'n' + cont)
            checkBox.setAttribute('type', 'checkbox')
            checkBox.setAttribute('class', 'form-check-input')
            label.appendChild(checkBox);

            // p
            var p = document.createElement("p")
            label.appendChild(p);

            // texto dentro do p
            var texto = document.createTextNode(cont);
            p.appendChild(texto);

            cont++
        }
    };
}

//Quando clicar no botão sortear, irá chamar a função sortearNumero
sortear.addEventListener("click", sortearNumero);



// funcoes
function verificarNumerosSelcionados() {

    for (var index = 1; index <= 60; index++) {
        var idCheckBox = document.getElementById("n" + index);
        if (idCheckBox.checked) {
            vNumSelect.push(idCheckBox.value)
        };
    };

}
//function que vai sortear os numeros da loteria
function sortearNumero() {
    limparCampos();

    verificarNumerosSelcionados();

    pNumSelec.textContent = `Números selecionados: ${vNumSelect}`;

    var numSorteio = 0;
    for (var i = 0; i < 6; i++) {
        numSorteio = getRndNum(1, 60);
        /*includes(element) é um método que determina se uma matriz contém um determinado elemento.
        Esse método retorna um valor boolean.
        Então enquanto tiver número repetido, haverá um sorteio novo */
        while (vNumSorteados.includes(numSorteio)) {
            numSorteio = getRndNum(1, 60);
        }
        vNumSorteados.push(Number(numSorteio));
    }
    pNumSorteados.textContent = `Números sorteados: ${vNumSorteados}`;

    // verificar se os números selecionados são de 6 a 15
    if (vNumSelect.length >= 6 && vNumSelect.length <= 15) {
        var cont = compararVetores(vNumSelect, vNumSorteados);
        if (cont == 0) {
            resultado.textContent = "Ops!! Você não acertou nenhum número. Tente novamente!!"
        }
        else {
            resultado.textContent = `Parabéns!! Você acertou ${cont} números.`
        }

    }
    else {
        alert("Para sortear, é necessário selecionar entre 6 e 15 números.");
        limparCampos();
    }

}
function getRndNum(min, max) {
    var numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero
}
function limparCampos() {
    pNumSorteados.textContent = "";
    pNumSelec.textContent = "Números selecionados: ";
    resultado.textContent = "";
    vNumSorteados = [];
    vNumSelect = [];
}
function compararVetores(vetor1, vetor2) {
    var numSelecionados = vetor1;
    var numSorteados = vetor2;
    var verificar = 0;
    var cont = 0;

    for (var i = 0; i < numSelecionados.length; i++) {
        for (var j = 0; j < numSorteados.length; j++) {
            verificar = numSelecionados[Number(i)] - numSorteados[Number(j)];
            if (verificar == 0) {
                cont++
            }
        }
    }
    return cont;
}
