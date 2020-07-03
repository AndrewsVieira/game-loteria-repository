const sorteio = {
    board: [],
    sequenciaSorteio: [],
    sequenciaSelecionada: [],
    qtdAposta: document.getElementById('qtdaposta'),
    nome: document.getElementById('nome'),
    valorPremio: document.getElementById('valorpremio'),
    cont: 0,

    init: function (container) {
        this.containerElement = container;

    },

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
        console.log(`Sequecia do sorteio: ${this.sequenciaSorteio}`);

    },

    gameover: false,
    containerElement: null,

    // função para compar vetores 
    compararVetores: function (vetor1, vetor2) {
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
        if (this.qtdAposta.value > 5 && this.qtdAposta.value < 16) {
            if (this.sequenciaSelecionada.length < this.qtdAposta.value) {
                // a linha 58 é pra mudar a cor do background de cada bolinha ao serem cliccadas.
                document.querySelector(`.div${posicao}`).style.backgroundColor = 'rgb(228, 129, 74)'
                document.querySelector(`.div${posicao}`).style.color = 'white'
                // armazena os valores do que for clicado em no vetor de números selecionados.
                this.sequenciaSelecionada.push(posicao + 1);

            }
            if (this.sequenciaSelecionada.length == this.qtdAposta.value) {
                this.pushSequenciaSorteio();
                this.cont = this.compararVetores(this.sequenciaSelecionada, this.sequenciaSorteio);
                console.log(this.sequenciaSelecionada);
                console.log(this.cont);
                this.gameover = true;
                console.log(`gameover: ${this.gameover}`)
            }

        } else {
            this.qtdAposta.focus();
        }

    },

    start: function () {
        this.pushBoard();
        this.draw();
        this.gameover = false;

    },

    content: '',

    draw: function () {
        console.log(this.board);
        for (i in this.board) {
            this.content += `<div onclick ="sorteio.makePlay(${i})" class="div${i}">${this.board[i]}</div>`
        }

        this.containerElement.innerHTML = this.content;

    },

    mostarResultados: function () {
        let resultados = document.querySelector('.resultados')
        let custos = 0
        let lucro = 0
        
        this.valorPremio = this.valorPremio.value
        let premioPorAcertos = (this.valorPremio * this.cont)/6

        if (this.gameover == true) {
            resultados.innerHTML = `${this.nome.value}, você acertou ${this.cont} Números<br>`

            // mudar as cores dos números selecionados se acertou e do sorteio
            for (i in this.sequenciaSorteio) {
                if (this.sequenciaSelecionada.includes(this.sequenciaSorteio[i])) {

                    document.querySelector(`.div${this.sequenciaSorteio[i] - 1}`).style.backgroundColor = 'rgb(154, 203, 173)'
                    

                } else {
                    document.querySelector(`.div${this.sequenciaSorteio[i] - 1}`).style.backgroundColor = 'rgb(222, 89, 90)'
                    document.querySelector(`.div${this.sequenciaSorteio[i] - 1}`).style.color = 'white'
                }

            }
            switch (this.qtdAposta.value) {
                case '6':
                    custos = 3.5
                    break
                case '7':
                    custos = 24.5
                    break
                case '8':
                    custos = 98.0
                    break
                case '9':
                    custos = 294.0
                    break
                case '10':
                    custos = 735.0
                    break
                case '11':
                    custos = 1617.0
                    break
                case '12':
                    custos = 3234.0
                    break
                case '13':
                    custos = 6006.0
                    break
                case '14':
                    custos = 10510.5
                    break
                case '15':
                    custos = 17517.5
                    break

            }

            lucro = premioPorAcertos - custos


            resultados.innerHTML += `Seu prêmio foi de R$${premioPorAcertos.toFixed(2)}.<br>`
            resultados.innerHTML += `Seus custos foram R$${custos.toFixed(2)}.<br>`
            resultados.innerHTML += `Seu resultado foi de R$${lucro.toFixed(2)}.`

            this.gameover = 'Game is over.'


        } else if (this.gameover == false) {
            resultados.innerHTML = 'Você precisa completar todas as etapas antes de sortear!'

        }
    }

}

