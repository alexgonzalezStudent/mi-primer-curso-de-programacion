const sectionDeSeleccionarLosAtaques = document.getElementById("seleccionar-ataques")
const sectionDeReiniciar = document.getElementById("reiniciar")
const botonSelecionarDragonJugador = document.getElementById("boton-dragon")
const botonDereiniciar = document.getElementById("boton-reiniciar")
const sectionDeMensajesGanador = document.getElementById("mensajes")

const sectionDeSeleleccionarDragon = document.getElementById("selecionar-dragon")
const spanDragonJugador = document.getElementById("dragon-jugador")
const spanDragonEnemigo = document.getElementById("dragon-enemigo")

const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo")

const sectionDeMensajes = document.getElementById("resultado")
const ataqueElegidoJugador = document.getElementById("ataque-drago-jugador")
const ataqueElegidoEnemigo = document.getElementById("ataque-drago-enemigo")
const contenedorTarjetas = document.getElementById("contendorTarjetas")
const contenedorBotonesAtaques = document.getElementById("contenedorBotonesAtaques")

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const SERVER_URL = "http://192.168.0.113:8080";


let jugadorId = null
let enemigoId = null
let dragones = []
let dragonesEnemigosMap = []
let opcionesDragones
let ataquesDelDragon
let ataqueJugador = []
let ataqueAleatorioEnemigo
let ataqueEnemigo = []
let inputIgnis
let inputAerion
let inputAbyssus
let inputMistro
let inputNiressa
let inputTriller
let dragoElegidoJugador
let dragoElegidoJugadorObjeto
let botonAgua
let botonFuego
let botonAire
let botones = []
let opcionesDisponiblesEnemigo = []
let opcionesUsadasEnemigo = []
let indexDrangonJugador
let numeroAleatorio
let indexDragonEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBaground = new Image()
mapaBaground.src = './imgdragrones/mapafondo.png'

let anchoDelMapa = window.innerWidth - 20
let alturaQueBuscamos = anchoDelMapa * 400 / 1000
const anchoMaximoDelMapa = 1020

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

function redimensionarMapa() {
    anchoDelMapa = window.innerWidth - 20
    alturaQueBuscamos = anchoDelMapa * 400 / 1000
    
    if(anchoDelMapa > anchoMaximoDelMapa){
        anchoDelMapa = anchoMaximoDelMapa - 20
    }

    mapa.width = anchoDelMapa
    mapa.height = alturaQueBuscamos
    
    // Asegurar que el fondo se redibuje
    if (mapaBaground.complete) {
        lienzo.drawImage(mapaBaground, 0, 0, mapa.width, mapa.height)
    }
    
    // Recalcular tamaños de dragones existentes
    if (dragones.length > 0) {
        dragones.forEach(dragon => {
            dragon.ancho = Math.max(40, anchoDelMapa * 0.08)
            dragon.alto = Math.max(40, anchoDelMapa * 0.08)
        });
    }
}

class Dragon {
    constructor(nombre, foto, vida, id = null) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.id = id
        this.ataques = []
        this.ancho = Math.max(40, anchoDelMapa * 0.08)  // 8% del ancho del mapa
        this.alto = Math.max(40, anchoDelMapa * 0.08)   // 8% del ancho del mapa
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidady = 0
    }

    pintarDragon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )
    }
}

let ignis = new Dragon('Ignis', './imgdragrones/ignis.png', 3)

let aerion = new Dragon('Aerion', './imgdragrones/aerion.png', 3)

let abyssus = new Dragon('Abyssus', './imgdragrones/abyssus.png', 3)

let mistro = new Dragon('Mistro', './imgdragrones/mistro.png', 3)

let niressa = new Dragon('Niressa', './imgdragrones/niressa.png', 3)

let triller = new Dragon('Triller', './imgdragrones/triller.png', 3)

const IGNIS_ATAQUES = [
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💨', id: 'boton-aire' },
]

ignis.ataques.push(...IGNIS_ATAQUES)

//ignisEnemigo.ataques.push(...IGNIS_ATAQUES)

const AERION_ATAQUES =[
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💦', id: 'boton-agua' },
]

aerion.ataques.push(...AERION_ATAQUES)

//aerionEnemigo.ataques.push(...AERION_ATAQUES)

const ABYSSUS_ATAQUES = [
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

abyssus.ataques.push(...ABYSSUS_ATAQUES)

//abyssusEnemigo.ataques.push(...ABYSSUS_ATAQUES)

const MISTRO_ATAQUES = [
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
]

mistro.ataques.push(...MISTRO_ATAQUES)

//mistroEnemigo.ataques.push(...MISTRO_ATAQUES)

const NIRESSA_ATAQUES = [
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💨', id: 'boton-aire' },
]

niressa.ataques.push(...NIRESSA_ATAQUES)

//niressaEnemigo.ataques.push(...NIRESSA_ATAQUES)

const TRILLER_ATAQUES = [
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '💨', id: 'boton-aire' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
]

triller.ataques.push(...TRILLER_ATAQUES)

//trillerEnemigo.ataques.push(...TRILLER_ATAQUES)

dragones.push(ignis, aerion, abyssus, mistro, niressa, triller)

function iniciarJuego() {
    sectionDeSeleccionarLosAtaques.style.display = "none"
    sectionDeMensajesGanador.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    dragones.forEach((dagron) => {
        opcionesDragones = `
       <input type="radio" name="dragones" id=${dagron.nombre} />
        <label class="tarjetas-de-dragones" for=${dagron.nombre}>
         <p>${dagron.nombre}</p>
         <img src=${dagron.foto} alt=${dagron.nombre}>
         </label>
      
      `
        contenedorTarjetas.innerHTML += opcionesDragones

        inputIgnis = document.getElementById("Ignis")
        inputAerion = document.getElementById("Aerion")
        inputAbyssus = document.getElementById("Abyssus")
        inputMistro = document.getElementById("Mistro")
        inputNiressa = document.getElementById("Niressa")
        inputTriller = document.getElementById("Triller")
    })


    sectionDeReiniciar.style.display = "none"
    botonSelecionarDragonJugador.addEventListener("click", seleccionarDragon)
    botonDereiniciar.addEventListener("click", reiniciarCombate)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch(`${SERVER_URL}/unirse`)
    .then(function (res) {
        if(res.ok){
            res.text()
            .then(function (respuesta){
                jugadorId = respuesta
               console.log(respuesta)
            })
        }
    })
}


function seleccionarDragon() {
    
    if (inputIgnis.checked) {
        spanDragonJugador.innerHTML = `<img src=${ignis.foto} alt=${ignis.nombre}>
         </label> `
        dragoElegidoJugador = inputIgnis.id
    } else if (inputAerion.checked) {
        spanDragonJugador.innerHTML = `<img src=${aerion.foto} alt=${aerion.nombre}>
         </label> `
        dragoElegidoJugador = inputAerion.id
    } else if (inputAbyssus.checked) {
        spanDragonJugador.innerHTML = `<img src=${abyssus.foto} alt=${abyssus.nombre}>
         </label> `
        dragoElegidoJugador = inputAbyssus.id
    } else if (inputMistro.checked) {
        spanDragonJugador.innerHTML = `<img src=${mistro.foto} alt=${mistro.nombre}>
         </label> `
        dragoElegidoJugador = inputMistro.id
    } else if (inputNiressa.checked) {
        spanDragonJugador.innerHTML = `<img src=${niressa.foto} alt=${niressa.nombre}>
         </label> `
        dragoElegidoJugador = inputNiressa.id
    } else if (inputTriller.checked) {
        spanDragonJugador.innerHTML = `<img src=${triller.foto} alt=${triller.nombre}>
         </label> `
        dragoElegidoJugador = inputTriller.id
    } else { alert("tienes que elegir tu dragon")
        //sectionDeSeleleccionarDragon.style.display = "flex"; // Mostrar de nuevo la sección
        return; 
    }
     sectionDeSeleleccionarDragon.style.display = "none"
     seleccionarDragonBakend(dragoElegidoJugador)

    sectionVerMapa.style.display = 'flex'
    mostrarMapa()
    tomarAtaques(dragoElegidoJugador)
}

function seleccionarDragonBakend(dragoElegidoJugador){
    fetch(`${SERVER_URL}/dragon/${jugadorId}`, {
        method : "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            dragon : dragoElegidoJugador
        
        }
        )
    })
}


function tomarAtaques(dragoElegidoJugador) {
    let ataques
    for (let i = 0; i < dragones.length; i++) {
        if (dragoElegidoJugador === dragones[i].nombre) {
            ataques = dragones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesDelDragon = `
       <button id=${ataque.id} class="botones-de-ataques Bataques" >${ataque.nombre}</button>
       `
        contenedorBotonesAtaques.innerHTML += ataquesDelDragon

    });
    botonAgua = document.getElementById("boton-agua")
    botonFuego = document.getElementById("boton-fuego")
    botonAire = document.getElementById("boton-aire")
    botones = document.querySelectorAll('.Bataques')

    secuenciaAques()
}

function secuenciaAques() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push("🔥")
                boton.disabled = true
                boton.style.background = ' rgba(50, 2, 154, 0.6)'
               // console.log(ataqueJugador)
            } else
                if (e.target.textContent === '💨') {
                    ataqueJugador.push("💨")
                    boton.disabled = true
                    boton.style.background = ' rgba(50, 2, 154, 0.6)'
                 //   console.log(ataqueJugador)
                } else {
                    ataqueJugador.push("💦")
                    boton.disabled = true
                    boton.style.background = ' rgba(50, 2, 154, 0.6)'
                   // console.log(ataqueJugador)
                } //ataqueDragonEnemigo()
                  if(ataqueJugador.length === 6) {
                    enviarAtaques()
                  }
        })
    })
}



function enviarAtaques(){
     fetch(`${SERVER_URL}/dragon/${jugadorId}/ataques`,{
          method : "post",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            ataques : ataqueJugador
          })
     })

     intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
   fetch(`${SERVER_URL}/dragon/${enemigoId}/ataques`)
     .then(function(res) {
        if(res.ok){
            res.json()
             .then(function({ ataques }){
                if(ataques.length === 6){
                    ataqueEnemigo = ataques
                    combateDeDragones()
                }
             }
            )
        }
     }
    )
}

function selecionarDragonEnemigo(enemigo){
   //et dragonAleatorio = dragones[aleatorio(dragones.length - 1, 0)]//
   if (!enemigo) {
        console.error("No se proporcionó un enemigo válido");
        return;
    }
    spanDragonEnemigo.innerHTML = ` <img src=${enemigo.foto} alt=${enemigo.nombre}>
         </label> `


    ataqueAleatorioEnemigo = enemigo.ataques
   //console.log(dragonAleatorio)
   console.log(ataqueAleatorioEnemigo)
   console.log(enemigo.nombre)

}

function ataqueDragonEnemigo() {
    opcionesDisponiblesEnemigo = Array.from(
        { length: ataqueAleatorioEnemigo.length }, (_, index) => index);

    opcionesDisponiblesEnemigo = opcionesDisponiblesEnemigo.filter(opcion => !opcionesUsadasEnemigo.includes(opcion));

    numeroAleatorio = opcionesDisponiblesEnemigo[Math.floor(Math.random() * opcionesDisponiblesEnemigo.length)];

    opcionesUsadasEnemigo.push(numeroAleatorio)

    console.log('el enmigo eligio', numeroAleatorio)
    console.log('ya usuo', opcionesUsadasEnemigo)
    console.log('le quedan disponibles', opcionesDisponiblesEnemigo)


    if (ataqueAleatorioEnemigo[numeroAleatorio].nombre === "💦") {
        ataqueEnemigo.push("💦")
    } else
        if (ataqueAleatorioEnemigo[numeroAleatorio].nombre === "🔥") {
            ataqueEnemigo.push("🔥")
        } else {
            ataqueEnemigo.push("💨")
        }

    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length === 6) {
        combateDeDragones()
    }
}
function indexAmbosDragones(jugador, enemigo) {
    indexDrangonJugador = ataqueJugador[jugador]
    indexDragonEnemigo = ataqueEnemigo[enemigo]

}

function combateDeDragones() {
    clearInterval(intervalo)
    for(let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosDragones(index, index)
        } else
            if (ataqueJugador[index] === "💦" && ataqueEnemigo[index] === "🔥" ||
                ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "💨" ||
                ataqueJugador[index] === "💨" && ataqueEnemigo[index] === "💦") {
                indexAmbosDragones(index, index)
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
            } else {
                victoriasEnemigo++
                spanVictoriasEnemigo.innerHTML = victoriasEnemigo
                indexAmbosDragones(index, index)
            }
        mensajesDEAtaques()
    } ContarVictorias()
}

        
function ContarVictorias() {
    if (victoriasJugador > victoriasEnemigo) {
        MensajeFinalDelCombate("Felicidades! Has ganado el combate")
    } else if (victoriasJugador < victoriasEnemigo) {
        MensajeFinalDelCombate("Los siento, tu perdistes ")
    } else {
        MensajeFinalDelCombate("Tremendo combate pero hubo Empate")
    }
}

function mensajesDEAtaques() {
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    // sectionDeMensajes.innerHTML =  resultadoCombate 
    nuevoAtaqueJugador.innerHTML = indexDrangonJugador
    nuevoAtaqueEnemigo.innerHTML = indexDragonEnemigo

    ataqueElegidoJugador.appendChild(nuevoAtaqueJugador)
    ataqueElegidoEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function MensajeFinalDelCombate(resultadoFinalCombate) {
    sectionDeReiniciar.style.display = "flex"
    sectionDeMensajesGanador.style.display = "flex"
    sectionDeMensajes.innerHTML = resultadoFinalCombate

}

function reiniciarCombate() {
    location.reload()
}

function aleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanva() {
    dragoElegidoJugadorObjeto.x = dragoElegidoJugadorObjeto.x + dragoElegidoJugadorObjeto.velocidadX
    dragoElegidoJugadorObjeto.y = dragoElegidoJugadorObjeto.y + dragoElegidoJugadorObjeto.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBaground,
        0,
        0,
        mapa.width,
        mapa.height, 
    )

        dragoElegidoJugadorObjeto.pintarDragon()
       enviarPosicion(dragoElegidoJugadorObjeto.x, dragoElegidoJugadorObjeto.y)
       dragonesEnemigosMap.forEach(function(dragon){
        console.log(dragonesEnemigosMap)
         dragon.pintarDragon()
         revisarColision(dragon)
       })
}

function enviarPosicion(x, y){
     fetch(`${SERVER_URL}/dragon/${jugadorId}/posicion`,{
        method : "post",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y
      })
   })
      .then(function (res) {
            if(res.ok){
                res.json()
                  .then(function({ enemigosBakend}){
                    console.log( enemigosBakend)
                      dragonesEnemigosMap =   enemigosBakend.map(function(enemigo){
                      console.log("Enemigo completo:", enemigo); // ← Ver estructura real
                      console.log("Tiene dragon?:", enemigo.dragon); // ← Ver si existe
                        const dragonNombre = enemigo?.dragon.nombre || "";
                        console.log(dragonNombre)
                        let dragonEnemigoServidor = null

                        if(dragonNombre === "Ignis"){
                            dragonEnemigoServidor = new Dragon('Ignis', './imgdragrones/ignis.png',3,enemigo.id)
                        }else 
                        if(dragonNombre === "Aerion"){
                             dragonEnemigoServidor = new Dragon('Aerion', './imgdragrones/aerion.png',3, enemigo.id)
                        }else
                        if(dragonNombre === "Abyssus"){
                            dragonEnemigoServidor = new Dragon('Abyssus', './imgdragrones/abyssus.png',3, enemigo.id)
                        }else
                        if(dragonNombre === "Mistro"){
                             dragonEnemigoServidor = new Dragon('Mistro', './imgdragrones/mistro.png',3, enemigo.id)
                        }else
                        if(dragonNombre === "Niressa"){
                             dragonEnemigoServidor = new Dragon('Niressa', './imgdragrones/niressa.png',3, enemigo.id)
                        }else
                        if(dragonNombre === "Triller"){
                             dragonEnemigoServidor = new Dragon('Triller', './imgdragrones/triller.png',3, enemigo.id)
                        }

                        dragonEnemigoServidor.x = enemigo.x
                        dragonEnemigoServidor.y = enemigo.y
                        
                        return dragonEnemigoServidor
                        
                    })

              })
            }
        })
}

function moverArriba() {
    dragoElegidoJugadorObjeto.velocidady = -20
}
function moverIzquierda() {
    dragoElegidoJugadorObjeto.velocidadX = -20
}

function moverAbajo() {
    dragoElegidoJugadorObjeto.velocidady = 20
}

function moverDerecha() {
    dragoElegidoJugadorObjeto.velocidadX = 20
}

function detenerMovimiento() {
    dragoElegidoJugadorObjeto.velocidadX = 0
    dragoElegidoJugadorObjeto.velocidady = 0
}

function sePrecionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowRight':
            moverDerecha()
            break
    }
}

function mostrarMapa() {
    redimensionarMapa() // Asegurar tamaño correcto
    dragoElegidoJugadorObjeto = obternerDragonSeleccionado(dragoElegidoJugador)
    
    // Ajustar posición si está fuera de los nuevos límites
    dragoElegidoJugadorObjeto.x = Math.min(dragoElegidoJugadorObjeto.x, mapa.width - dragoElegidoJugadorObjeto.ancho)
    dragoElegidoJugadorObjeto.y = Math.min(dragoElegidoJugadorObjeto.y, mapa.height - dragoElegidoJugadorObjeto.alto)
    
    intervalo = setInterval(pintarCanva, 50)
    window.addEventListener('keydown', sePrecionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obternerDragonSeleccionado(){
    for (let i = 0; i < dragones.length; i++) {
        if (dragoElegidoJugador === dragones[i].nombre) {
            return dragones[i]
        }}
}
 // determina si las imagenes estan colisionando
 function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdadEnemigo = enemigo.x 
    const derechaEnemigo = enemigo.x + enemigo.ancho 

    const arribaDragon = dragoElegidoJugadorObjeto.y
    const abajoDragon = dragoElegidoJugadorObjeto.y + dragoElegidoJugadorObjeto.alto
    const izquierdaDragon = dragoElegidoJugadorObjeto.x 
    const derechaDragon = dragoElegidoJugadorObjeto.x + dragoElegidoJugadorObjeto.ancho

    if(abajoDragon < arribaEnemigo ||
       arribaDragon > abajoEnemigo||
       derechaDragon < izquierdadEnemigo||
       izquierdaDragon > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
     sectionDeSeleccionarLosAtaques.style.display = "flex"
     sectionVerMapa.style.display = "none"
     console.log("se detecto una colision");
     enemigoId = enemigo.id
     
      selecionarDragonEnemigo(enemigo)
     //alert("Hay una Colision Con "+ enemigo.nombre)
 }

window.addEventListener("load", function() {
    // Inicializar el mapa primero
    redimensionarMapa()
    // Luego iniciar el juego
    iniciarJuego()
})
