const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let gravidade = 0.5
let pontuacao = 0   
    
document.addEventListener("click", (e) => {
    if(gameover==true){
        location.reload()
    }
})
// document.addEventListener('keydown', (e) => {
//     if(gameover==true){
//         location.reload()
//     }else if (e.code === "ArrowUp"){personagemPula()}
//     else if (e.code === "ArrowDown") {personagemCai()}
//     else if (e.code === "ArrowRight"){personagemLadoD()}
//     else if(e.code === "ArrowLeft"){personagemLadoE()}
    
// })

let gameover = false

document.addEventListener('keypress', (e) =>{
    if(e.code = 'Space'){
        if(personagem.localiza){
            personagem.velocidadey = -15
            personagem.pulando = true
            gravidade = 0.5
        }else {
            personagem.velocidadey = +15
            gravidade = -0.5
            personagem.pulando = true
        }
        if(gameover==true){
            location.reload()
        }
        
    }
})


const personagem = {
    posicaox: 50,
    posicaoy: canvas.height-50,
    largura: 50,
    altura: 50,
    velocidadey: 0,
    pulando: false,
    localiza: true
}

function desenhaPersonagem(){
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.posicaox, personagem.posicaoy,personagem.largura,personagem.altura)
}
function atualizaPersonagem(){
    if(personagem.pulando == true){
        personagem.velocidadey += gravidade
        personagem.posicaoy += personagem.velocidadey
        if(personagem.posicaoy >= canvas.height-50){
            personagem.pulando = false
            personagem.velocidadey = 0
            personagem.posicaoy = canvas.height-50        
            personagem.localiza = true
        }else  if(personagem.posicaoy <= canvas.height-400){
            personagem.pulando = false
            personagem.velocidadey = 0
            personagem.posicaoy = 0        
            personagem.localiza = false
        }           
    }
}

const obstaculo = {
    posx: canvas.width-100,
    posy: canvas.height-100,
    tamanhox: 50,
    tamanhoy: 100,
    vecolidade: 5
}

function desenhaBloco(){
    ctx.fillStyle = 'red'
    ctx.fillRect(obstaculo.posx, obstaculo.posy,obstaculo.tamanhox,obstaculo.tamanhoy)
}

// function personagemPula(){
//         personagem.posicaoy -= 50
//         console.log(personagem.posicaoy)
//         if(personagem.posicaoy < 0){
//             personagem.posicaoy += 400
//         }
// }
// function personagemCai(){
//     personagem.posicaoy += 50
//     console.log(personagem.posicaoy)
//     if(personagem.posicaoy > 399){
//         personagem.posicaoy -= 400
//     }
// }
// function personagemLadoD(){
//     personagem.posicaox += 50
//     console.log(personagem.posicaox)
//     if(personagem.posicaox > 799){
//         personagem.posicaox -= 800
//     }
// }
// function personagemLadoE(){
//     personagem.posicaox -= 50
//     console.log(personagem.posicaox)
//     if(personagem.posicaox < 0){
//         personagem.posicaox += 800
//     }
// }

function atualizaObstaculo(){
    obstaculo.posx -= obstaculo.vecolidade
    if(obstaculo.posx <= 0-obstaculo.largura){
        obstaculo.posx += canvas.width+30
       
    }
}

function verificaColisao(){
    if(
        personagem.posicaox < obstaculo.posx + obstaculo.tamanhox && 
        personagem.posicaox + personagem.largura  > obstaculo.posx   &&
        personagem.posicaoy  >= obstaculo.posy
    ){
        gameOver()
    }
}

function gameOver (){
    gravidade = 20
    obstaculo.vecolidade = 0
    atualizaObstaculo()
    ctx.fillStyle='red'
    ctx.fillRect((canvas.width/2)-150,(canvas.height/2)-50,350,100)
    ctx.fillStyle='black'
    ctx.font='50px Arial'
    ctx.fillText("Game Over", (canvas.width/2)-100,(canvas.height/2))
    gameover = true
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenhaPersonagem()
    desenhaBloco()
    verificaColisao()
    atualizaPersonagem()
    atualizaObstaculo()
    requestAnimationFrame(loop)
}
    
loop()