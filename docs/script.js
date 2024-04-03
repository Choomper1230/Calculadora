let Total = 0;
let aumento = "0";
let anteriorOperador;
const colorUno = document.querySelector(".color1");
const colorDos = document.querySelector(".color2");
const colorTres = document.querySelector(".color3");
const colorFondo = document.documentElement.style;
const botonAct = document.querySelector("#actualizar")

botonAct.addEventListener('click', () => {
    colorFondo.setProperty("--colorUno", colorUno.value)
    colorFondo.setProperty("--colorDos", colorDos.value)
    colorFondo.setProperty("--colorTres", colorTres.value)
})


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