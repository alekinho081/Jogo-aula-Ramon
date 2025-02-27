const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let random = Math.random() * 50
let gameOver = false
const propriedades = {
    x: 0,
    y: 0,
    altura: 0,
    largura: 0,
    cor: '',
}
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space') {
        personagem.pulo()
        if(gameOver==true){
            location.reload()
        }
    }
})
document.addEventListener("click", (e) => {
    if(gameOver==true){
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
    desenha = function (ctx, cor) {
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
    constructor(propriedades) {
        super(propriedades)
        this.#velocidadey = 0
        this.#pulando = false
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
            }if(this.y < 1){
                this.y = 0
            }
        }
    }

    pulo = function () {
        this.#pulando = true
        this.#velocidadey = -6
        console.log("Pulando")

    }

    verificarColisao = function(obstaculo){
        if(
            this.x < obstaculo.x + obstaculo.largura &&
        this.x + this.largura > obstaculo.x &&
        this.y < obstaculo.y + obstaculo.altura &&
        this.y + this.altura > obstaculo.y
        ){  
            this.#houveColisao(obstaculo)
        }
    }
    #houveColisao = function (obstaculo){
        this.pararPersonagem()
        obstaculo.atualiza()
        ctx.fillStyle='red'
        ctx.fillRect((canvas.width/2)-200,(canvas.height/2)-50,400,100)
        ctx.fillStyle='black'
        ctx.font="50px Arial"
        ctx.fillText("GAME OVER",(canvas.width/2)-150,(canvas.height/2))
        gameOver=true
    }
    pararPersonagem = function (){
        this.#velocidadey = this.getGravidade() + 40
        this.pulando = false
        
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
    pararObstaculo = function (){
        this.#velocidadex = 0
    }

}



let a = Math.random() * 50
console.log(a + '')

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



const propriedadesObst4 = {
    random: Math.random() * 50,
    cor: 'red',
    largura: 50,
    altura: 100,
    x: canvas.width + 500 + random,
    y: canvas.height - 100,
}


const propriedadesObst3 = {
    cor: 'red',
    largura: 50,
    altura: 100,
    x: canvas.width + 500 + random,
    y: 0,
}




const obstaculos = [];
for (let i = 0; i < 2; i++) {

    if(i % 2 == 0 ){
        obstaculos.push(new Obstaculo (propriedadesObst1))
    } else {
        obstaculos.push(new Obstaculo (propriedadesObst2))
    }
    console.log(obstaculos)
}

const obstaculos2 = [];
for (let i = 0; i < 2; i++) {

    if(i % 2 == 0 ){
        obstaculos2.push(new Obstaculo (propriedadesObst4))
    } else {
        obstaculos2.push(new Obstaculo (propriedadesObst3))
    }
    console.log(obstaculos2)
}




const personagem = new Personagem(propriedadesPerso1)
const obstaculo = new Obstaculo(propriedadesObst1)
const obstaculo2 = new Obstaculo(propriedadesObst2)



function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    personagem.desenha(ctx)
    personagem.atualiza()
    obstaculos.forEach((obstaculo) => {
        personagem.verificarColisao(obstaculo);
        if(gameOver == true){
            obstaculo.pararObstaculo()
        }
    });
    obstaculos2.forEach((obstaculo) => {
        personagem.verificarColisao(obstaculo);
        if(gameOver == true){
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