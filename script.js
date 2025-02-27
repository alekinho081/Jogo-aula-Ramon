const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let random = Math.random() * 50
let gameOver = false

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space') {
        personagem.pular()
        if (gameOver == true) {
            location.reload()
        }
    }
})
document.addEventListener("click", (e) => {
    if (gameOver == true) {
        location.reload()
    }
})

class Entidade {
    #gravidade
    constructor(propriedades) {
        this.x = propriedades.x
        this.y = propriedades.y
        this.altura = propriedades.altura
        this.largura = propriedades.largura
        this.cor = propriedades.cor
        this.#gravidade = 0.2
    }
    desenha = function (ctx) {
        console.log("Fazer função de desenhar")
    }
    atualiza = function () {
        console.log("Fazer função de atualizar")
    }
    getGravidade = function () {
        return this.#gravidade
    }
}

class Personagem extends Entidade {
    #velocidadey
    #pulando
    #pontuacao
    constructor(propriedades) {
        super(propriedades)
        this.#velocidadey = 0
        this.#pulando = false
        this.pontuacao = 0
        this.pontuar = false
    }

    desenha = function (ctx) {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
    atualiza = function () {
        if (this.#pulando == true) {
            this.#velocidadey += this.getGravidade()
            this.y += this.#velocidadey
            if (this.y >= canvas.height - 50) {
                this.#pulando = false
                this.#velocidadey = 0
                this.y = canvas.height - 50
            } if (this.y < 1) {
                this.y = 0
            }
        }
    }

    pular = function () {
        this.#pulando = true
        this.#velocidadey = -6
        console.log(this.x +  '<- y x ->' + this.y)

    }

    verificarColisao = function (obstaculo) {
        if (
            this.x < obstaculo.x + obstaculo.largura &&
            this.x + this.largura > obstaculo.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y
        ) {
            this.#houveColisao(obstaculo)
        }
        if(obstaculo.x + obstaculo.largura < 50){
            this.pontuar = true
            setTimeout(this.pontua(), 2000)
            console.log(this.pontuacao)
        }
    }

    #houveColisao = function (obstaculo) {
        this.pararPersonagem()
        obstaculo.atualiza()
        ctx.fillStyle = 'red'
        ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100)
        ctx.fillStyle = 'black'
        ctx.font = "50px Arial"
        ctx.fillText("GAME OVER", (canvas.width / 2) - 150, (canvas.height / 2))
        gameOver = true
    }

    pararPersonagem = function () {
        this.#velocidadey = this.getGravidade() + 40
        this.pulando = false
    }
    pontua = function (){
        this.pontuacao += 1
    }
}

class Obstaculo extends Entidade {
    #velocidadex
    constructor(propriedades) {
        super(propriedades)
        this.#velocidadex = 5
    }

    desenha = function (ctx) {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    atualiza = function () {
        this.x -= this.#velocidadex
        if (this.x <= 0 - this.largura && this.y != 0) {
            this.x += canvas.width + 50
            let alturaRandom = (Math.random() * 50) + 90
            this.altura = alturaRandom
            this.y = canvas.height - alturaRandom
        } else if (this.x <= 0 - this.largura && this.y == 0) {
            this.x += canvas.width + 50
            let alturaRandom = (Math.random() * 50) + 90
            this.altura = alturaRandom
        }
    }
    pararObstaculo = function () {
        this.#velocidadex = 0
    }
}

const propriedadesPerso1 = {
    cor: 'white',
    largura: 50,
    altura: 50,
    x: 50,
    y: canvas.height - 50,
}
const propriedadesObst1 = {
    cor: 'red',
    largura: 50,
    altura: 100,
    x: canvas.width,
    y: canvas.height - 100,
}
const propriedadesObst2 = {
    cor: 'red',
    largura: 50,
    altura: 100,
    x: canvas.width,
    y: 0,
}
const propriedadesObst3 = {
    cor: 'red',
    largura: 50,
    altura: 100,
    x: canvas.width + 500 + random,
    y: 0,
}
const propriedadesObst4 = {
    random: Math.random() * 50,
    cor: 'red',
    largura: 50,
    altura: 100,
    x: canvas.width + 500 + random,
    y: canvas.height - 100,
}

const obstaculos = [];
for (let i = 0; i < 2; i++) {
    if (i % 2 == 0) {
        obstaculos.push(new Obstaculo(propriedadesObst1))
    } else {
        obstaculos.push(new Obstaculo(propriedadesObst2))
    }
}
const obstaculos2 = [];
for (let i = 0; i < 2; i++) {
    if (i % 2 == 0) {
        obstaculos2.push(new Obstaculo(propriedadesObst4))
    } else {
        obstaculos2.push(new Obstaculo(propriedadesObst3))
    }
}

const personagem = new Personagem(propriedadesPerso1)

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    personagem.desenha(ctx)
    personagem.atualiza()
    obstaculos.forEach((obstaculo) => {
        personagem.verificarColisao(obstaculo)
        if (gameOver == true) {
            obstaculo.pararObstaculo()
        }
    })
    obstaculos2.forEach((obstaculo) => {
        personagem.verificarColisao(obstaculo)
        if (gameOver == true) {
            obstaculo.pararObstaculo()
        }
    });
    obstaculos.forEach((obstaculo) => {
        obstaculo.desenha(ctx)
        obstaculo.atualiza()
    })
    obstaculos2.forEach((obstaculo) => {
        obstaculo.desenha(ctx)
        obstaculo.atualiza()
    })
    requestAnimationFrame(loop)
}

loop()