const sorteio = {
    board: [],
    sequenciaSorteio: [],
    sequenciaSelecionada: [],

    // na função abaixo vamos preencher o objeto board, com os números de 1 a 60.
    pushBoard: function () {
        for (var i = 1; i <= 60; i++) {
            this.board.push(i);

        }

    },
    // na função abaixo vamos preencher o objeto sequenciaSorteio, com seis números.
    pushSequenciaSorteio: function () {
        let max = 60;
        let min = 1;
        for (var i = 1; i <= 6; i++) {
            let numSorteio = Math.floor(Math.random() * (max - min) + 1);
            while (this.sequenciaSorteio.includes(numSorteio)) {
                numSorteio = Math.floor(Math.random() * (max - min) + 1);
            }
            this.sequenciaSorteio.push(numSorteio);

        }

    },
    
    gameover: false,
    containerElement: null,

    init: function (container) {
        this.containerElement = container;

    },
    // função para compar vetores 
    compararVetores: function(vetor1, vetor2) {
        let numSelecionados = vetor1;
        let numSorteados = vetor2;
        let cont = 0;
    
        for (var i = 0; i < numSelecionados.length; i++) {
            for (var j = 0; j < numSorteados.length; j++) {
                if (numSelecionados[Number(i)] == numSorteados[Number(j)]) {
                    cont++
                }
            }
        }
        return cont;
    },

    // função que faz aparecer o cenário.
    makePlay: function (posicao) {

        if (this.gameover) return false;
        if (this.sequenciaSelecionada.length <= 15) {
            this.sequenciaSelecionada.push(posicao + 1);

        }
        if (this.sequenciaSelecionada.length >=6 && this.sequenciaSelecionada.length <= 15) {
            let cont = this.compararVetores(this.sequenciaSelecionada, this.sequenciaSorteio);

            console.log(this.sequenciaSelecionada);
            console.log(cont);

        }

    },

    start: function () {
        this.pushBoard();
        this.pushSequenciaSorteio();
        this.draw();
        this.gameover = false;

    },
    
    content: '',

    draw: function () {
        console.log(this.board);
        console.log(this.sequenciaSorteio); 

        for (i in this.board) {
            this.content += `<div onclick ="sorteio.makePlay(${i})">${this.board[i]}</div>`
        }

        this.containerElement.innerHTML = this.content;
    }

}

