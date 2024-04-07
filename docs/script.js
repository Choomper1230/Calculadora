//Declaraciones de Variables

let Total = 0;
let aumento = "0";
let anteriorOperador;
let romper = 0;
const colorUno = document.querySelector(".color1");
const colorDos = document.querySelector(".color2");
const colorTres = document.querySelector(".color3");
const root = document.documentElement.style;
const botonAct = document.querySelector("#actualizar")
const menu = document.querySelector(".menu")
const botonMenu = document.querySelector("#siguiente")
const botonAtras = document.querySelector("#atras")
const body = document.querySelector("#body")
const difuminado = document.querySelector(".difuminado")
const grados = document.querySelector("#grados")
const opcionColor = document.querySelector('.boton-padre')
const opcionGrados = document.querySelector('.grados')

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

//Color Picker

colorUno.addEventListener('input', () =>{
    root.setProperty("--colorUno", colorUno.value)
})

colorDos.addEventListener('input', () =>{
    root.setProperty("--colorDos", colorDos.value)
    
    let valor = colorDos.value;

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
})

colorTres.addEventListener('input', () =>{
    root.setProperty("--colorTres", colorTres.value)
})

//Funcionamiento de Calculadora

const pantalla = document.querySelector('.pantalla');

function clickBoton(value){
    if (isNaN(value)) {
        unSimbolo(value);
    }
    else{
        unNumero(value);
    }
    pantalla.innerText = aumento;
}
function unSimbolo(simbolo) {
    switch (simbolo) {
        case 'C':
            aumento = '0';
            Total = 0;
            break;
        case '=':
            if (anteriorOperador === null) {
                return
            }
            Operacion(parseFloat(aumento));
            anteriorOperador = null;
            aumento = Total;
            Total = 0;
            break;
        case '←':
            if (aumento.length === 1) {
                aumento = '0';
            }else{
                aumento = aumento.substring(0, aumento.length - 1);
            }
            break;
        case '.':
            aumento = aumento + '.';
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
        case '%':
        case '^':
        case '√':
            matematica(simbolo);
            break;      
    }
}
function matematica(simbolo) {
    if (aumento === '0') {
        return;
    }
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
    }else{
        aumento += numeroString;
    }
}
function init() {
    document.querySelector('.botones').addEventListener('click',function(event){
        clickBoton(event.target.innerText);
    })
}
init();
