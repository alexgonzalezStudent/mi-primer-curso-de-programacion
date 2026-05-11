const express = require("express")
const cors = require("cors")
const app = express()
const path = require('path');

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "img-src 'self' data:");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json())


const jugadores = []

class Jugador{
    constructor(id){
        this.id = id;
        

    }
    asinarDragon(dragon){
        this.dragon = dragon;
    }

    actualizarPosicion(x,y){
        this.x = x;
        this.y = y;
    }

    asinarAtaques(ataques){
      this.ataques = ataques
    }
}

class Dragon{
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req,res) => {
  const id = `${Math.random()}`
  const jugador = new Jugador(id)
  jugadores.push(jugador)
  console.log(jugadores.length)
  res.send(id)
})

app.post("/dragon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.dragon || ""
    console.log(nombre)
    const dragon = new Dragon(nombre)
    console.log(dragon)

    const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)
    console.log(jugadorIndex)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asinarDragon(dragon)
       console.log("Dragón asignado:", jugadores[jugadorIndex].dragon);
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/dragon/:jugadorId/posicion", (req, res) => {
   const jugadorId = req.params.jugadorId || ""
   const x = req.body.x
   const y = req.body.y

   const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
      
        const enemigosBakend = jugadores.filter((jugador) => jugadorId !== jugador.id)
         console.log(enemigosBakend.length)
        res.send({
            enemigosBakend
        });

    }

})

app.post("/dragon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques|| []
     console.log(ataques)

    const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asinarAtaques(ataques)

    }
    
    res.end()
})

app.get("/dragon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador =  jugadores.find((jugador) => jugadorId === jugador.id)
    const ataques = jugador.ataques || []
    res.send({
        ataques
    })

} )

app.listen(8080, () =>{
    console.log("servidor Listo")
})