let minutos = document.getElementById('minutos')
let tempo_min = document.querySelector('.tempo-min')
let descan_min = document.querySelector('.descan-min')
let audioElemento = document.querySelector('audio')

let btn_start = document.querySelector('button.btn-start')
let btn_reset = document.querySelector('.btn-reset')
let mais_tempo = document.querySelector('.mais-tempo')
let menos_tempo = document.querySelector('.menos-tempo')
let mais_descan = document.querySelector('.mais-descan')
let menos_descan = document.querySelector('.menos-descan')

btn_start.addEventListener('click', iniciar)
btn_reset.addEventListener('click', resetar)
mais_tempo.addEventListener('click', addtempo)
menos_tempo.addEventListener('click', menostempo)
mais_descan.addEventListener('click', add_descan)
menos_descan.addEventListener('click', menosdescan)

let minu = 25
// minu serve para ser o parametro inicial, quando o usuario alterar
// o tempo add ou menos, a var de ação sera o minu_modificado, assim
// podendo salvar os minutos q estavam quando alterar e quando att a pg
// volta aos 25  da var minu
let segun = 0
let verificador
let minu_modificado
minu_modificado = minu

let minu_descan = 5

function iniciar() {
    verificador = setInterval(tempo, 100) //setInterval() chama uma função a cada tempo, no caso chamando a cada 1 segundo
    btn_start.disabled = true //Desativa o botao inicar
    minu--
    segun = 60
}

function tempo() { // Inicia a contagem decrescente do cronometro
    segun -= 1
    if (segun == 00) {
        segun = 60
        minu--
    }
    if (minu < 0) {
        //Para o cronometro
        clearInterval(verificador) 
        minu = 0
        segun = 0

        //Muda a cor do cronometro para verde usando CSS
        minutos.classList.add('timer-up')

        minutos.innerHTML = formatarNumero(minu) + ':' + formatarNumero(segun)

        //Da play no audio
        audioElemento.play()

        //espera 5seg antes de chamar a função tempo_descan()
        setTimeout(() => {
            verificador = setInterval(tempo_descan, 100)
        }, 5000)
    }

    minutos.innerHTML = formatarNumero(minu) + ':' + formatarNumero(segun)
}

function tempo_descan() {
    segun += 1
    if (segun == 60) {
        segun = 0
        minu++
    }
    if (minu == minu_descan) {
        clearInterval(verificador)

        audioElemento.play()
    }
    minutos.innerHTML = formatarNumero(minu) + ':' + formatarNumero(segun)
}

function resetar() {
    btn_start.disabled = false
    clearInterval(verificador)
    minutos.innerHTML = formatarNumero(minu_modificado) + ':00'

    //remove a cor verde do time
    minutos.classList.remove('timer-up')
    minu = minu_modificado
    segun = 00
}

function formatarNumero(number) {
    return number < 10 ? "0" + number : number;
}

function addtempo() {
    minu++
    minu_modificado = minu
    minutos.innerHTML = formatarNumero(minu_modificado) + ':' + formatarNumero(segun)
    menos_tempo.disabled = false
    //ativa o botao de menos tempo
    tempo_min.innerHTML = formatarNumero(minu) + " min"
}

function menostempo() {
    minu--
    minu_modificado = minu
    minutos.innerHTML = formatarNumero(minu) + ':' + formatarNumero(segun)

    tempo_min.innerHTML = formatarNumero(minu) + " min"

    if (minu == 1) { //ativa ou desativa o botao de menos tempo
        menos_tempo.disabled = true
    } else {
        menos_tempo.disabled = false
    }
}

function add_descan() {
    minu_descan++
    descan_min.innerHTML = formatarNumero(minu_descan) + " min"

    menos_descan.disabled = false
}

function menosdescan() {
    minu_descan--
    descan_min.innerHTML = formatarNumero(minu_descan) + " min"

    if (minu_descan == 1) {
        menos_descan.disabled = true
    }
}