//Declaraciones de Variables

let Total = 0;
let aumento = "0";
let aumentoArt = '0'
let anteriorOperador;
let romper = 0;
let unoColor = false;
let dosColor = false;
let tresColor = true;
const colorUno = document.querySelector(".color1");
const colorDos = document.querySelector(".color2");
const colorTres = document.querySelector(".color3");
const root = document.documentElement.style;
const html = document;
const menu = document.querySelector(".menu")
const botonMenu = document.querySelector("#siguiente")
const botonAtras = document.querySelector("#atras")
const body = document.querySelector("#body")
const difuminado = document.querySelector(".difuminado")
const grados = document.querySelector("#grados")
const opcionColor = document.querySelector('.boton-padre')
const opcionGrados = document.querySelector('.grados')
const nColorUno = document.querySelector('#n-colorUno')
const nColorDos = document.querySelector('#n-colorDos')
const nColorTres = document.querySelector('#n-colorTres')

//Botones de Menu

botonMenu.addEventListener('click', () => {
    root.setProperty("--moverAn", "moverUno 1s forwards");
    root.setProperty("--moverAp", "desaparecer 1s forwards");
    menu.style.display = "block"
    difuminado.style.display = "block"
    setTimeout(function() {
        botonMenu.style.display = "none"
        botonAtras.style.display = "block"
        root.setProperty("--moverAp", "aparecer 1s forwards");
    },1000)
})
botonAtras.addEventListener('click', () => {
    root.setProperty("--moverAn", "moverDos 1s forwards");
    root.setProperty("--moverAp", "desaparecer 1s forwards");
    difuminado.style.display = "none"
    setTimeout(function() {
        botonAtras.style.display = "none"
        menu.style.display = "none"
        botonMenu.style.display = "block"
        root.setProperty("--moverAp", "aparecer 1s forwards");
    },1000)
})

//Grados

grados.addEventListener('input', () => {
    root.setProperty("--grados", grados.value + "deg")
})

//#Colores

nColorUno.addEventListener('click', () => {
    desaparecerColor()
    colorUno.style.display = ""
    colorUno.style.width = "175px"
    opcionGrados.style.display = "none"
    body.style.background = "var(--backgroundUno)"
    unoColor = true
    dosColor = false
    tresColor = false
    cambiarColorBorde(colorUno)
})
nColorDos.addEventListener('click', () => {
    desaparecerColor()
    colorUno.style.display = ""
    colorDos.style.display = ""
    colorUno.style.width = "80px"
    colorDos.style.width = "80px"
    opcionGrados.style.display = ""
    body.style.background = "var(--backgroundDos)"
    unoColor = false
    dosColor = true
    tresColor = false
    cambiarColorBordeDos(colorUno,colorDos)
})
nColorTres.addEventListener('click', () => {
    reaparecerColor()
    colorUno.style.width = "50px"
    colorDos.style.width = "50px"
    colorTres.style.width = "50px"
    opcionGrados.style.display = ""
    body.style.background = "var(--backgroundTres)"
    unoColor = false
    dosColor = false
    tresColor = true
    cambiarColorBorde(colorDos)
})
function desaparecerColor() {
    colorUno.style.display = "none"
    colorDos.style.display = "none"
    colorTres.style.display = "none"
}
function reaparecerColor() {
    colorUno.style.display = ""
    colorDos.style.display = ""
    colorTres.style.display = ""
}

//Color Picker

colorUno.addEventListener('input', () =>{
    root.setProperty("--colorUno", colorUno.value)
    if (unoColor) {
        cambiarColorBorde(colorUno)
    }
    if (dosColor) {
        cambiarColorBordeDos(colorUno,colorDos)
    }
})

colorDos.addEventListener('input', () =>{
    root.setProperty("--colorDos", colorDos.value)
    if (dosColor) {
        cambiarColorBordeDos(colorUno,colorDos)
    }
    if (tresColor) {
        cambiarColorBorde(colorDos)
    }
})

colorTres.addEventListener('input', () =>{
    root.setProperty("--colorTres", colorTres.value)
})

function cambiarColorBordeDos(x,y) {
    let valorUno = x.value;
    let valorDos = y.value
    let romperDos = false;

        for (let i of valorUno) {
            if (i < 6) {
                romper--
                for (let i of valorDos) {
                    if (i < 6) {
                        root.setProperty("--colorBorde", "white")
                        romperDos = true;
                        break;
                    }else{
                    romper++;
                    if (romper > 1) {
                        root.setProperty("--colorBorde", "black")
                        break;
                        }
                    }
                }
            }else{
                romper++;
                if (romper > 1) {
                    root.setProperty("--colorBorde", "black")
                    break;
                }
            }
            if (romper > 1) {
                root.setProperty("--colorBorde", "black")
                break;
            }
            if (romperDos) {
                break;
            }
        }
    romper = 0;
    }

function cambiarColorBorde(x) {
    let valor = x.value;

        for (let i of valor) {
            if (i < 6) {
                root.setProperty("--colorBorde", "white")
                break;
            }
            else{
                romper++;
                if (romper === 2) {
                    root.setProperty("--colorBorde", "black")
                    break;
                }
            }
        }
    romper = 0;
}

//Funcionamiento de Calculadora

const pantalla = document.querySelector('.pantalla');
const pantallaArt = document.querySelector('.pantallaArtificial');


function clickBoton(value){
    if (isNaN(value)) {
        unSimbolo(value);
    }
    else{
        unNumero(value);
    }
    pantalla.innerText = aumento;
    pantallaArt.innerText = aumentoArt;
}
function unSimbolo(simbolo) {
    switch (simbolo) {
        case 'C':
            aumento = '0';
            aumentoArt = '0';
            Total = 0;
            anteriorOperador = null;
            break;
        case '=':
            if (anteriorOperador === null) {
                return
            }
            Operacion(parseFloat(aumento));
            anteriorOperador = null;
            aumento = Total;
            aumentoArt = Total;
            Total = 0;
            anteriorOperador = null;
            break;
        case '←':
            if (aumento.length === 1) {
                aumento = '0';
                aumentoArt = '0';
            }else{
                aumento = aumento.substring(0, aumento.length - 1);
                aumentoArt = aumentoArt.substring(0, aumentoArt.length - 1);
            }
            anteriorOperador = null;
            break;
        case '.':
            aumento = aumento + '.';
            aumentoArt = aumentoArt + '.';
            break;
        case '+': 
        case '−':
        case '×':
        case '÷':
        case '%':
        case '^':
            matematica(simbolo);
            aumentoArt += simbolo;
            break;  
        case '√':
            matematica(simbolo);
            aumentoArt = simbolo + aumentoArt;
            break;  
    }
}
function matematica(simbolo) {
    const intAumento = parseFloat(aumento);
    if (Total === 0) {
        Total = intAumento;
    }else{
        Operacion(intAumento);
    }
    anteriorOperador = simbolo;
    aumento = '0';
}
function Operacion(intAumento) {
    if (anteriorOperador === '+') {
        Total += intAumento;
    }else if(anteriorOperador === '−'){
        Total -= intAumento;
    }else if(anteriorOperador === '×'){
        Total *= intAumento;
    }else if(anteriorOperador === '÷'){
        Total /= intAumento;
    }else if(anteriorOperador === '%'){
        Total *= intAumento / 100;
    }else if(anteriorOperador === '^'){
        Total **= intAumento;
    }else if(anteriorOperador === '√'){
        Total **= (1/intAumento);
    }    
}
function unNumero(numeroString) {
    if (aumento === '0') {
        aumento = numeroString;
        if (anteriorOperador === '√') {
            aumentoArt = numeroString + aumentoArt;
        }else{
            aumentoArt += numeroString;
        }
    }else{
        aumento += numeroString;
        if (anteriorOperador === '√') {
            aumentoArt = numeroString + aumentoArt;
        }else{
            aumentoArt += numeroString;
        }
    }
}
function init() {
    document.querySelector('.botones').addEventListener('click',function(event){
        clickBoton(event.target.innerText);
    })
}
init();