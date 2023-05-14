let tam = 5;
let audio = document.getElementById("myAudio");
let empezar = false;
let cuadros = [];
let nivel = 2;
let vidas = 3;
let perdiste = true;
$('.nivel').html(`Nivel: ${nivel - 1}`);

function loadMatriz() {
    $('.tabla').html('');
    vidas = 3;
    let id = 0;
    for (let i = 0; i < tam; i++) {
        let colum = '';
        for (let j = 0; j < tam; j++) {
            colum += `<td class="celda" id="${id + 1}"></td>`;
            id++;
        }
        $('.tabla').append(`<tr>${colum}</tr>`);
    }
}
function pintarCelda(numAleatorio) {
    $('.celda').removeClass('tono');
    $(`#${numAleatorio}`).addClass(`tono`);
    //audio.play();
}
function quitarAyuda() {
    $('.help').addClass('help-disable');
}
function pintarMatriz() {
    if (perdiste) {
        nivel = 3;
        vidas = 3;
        $('.vidas').html(`Tienes ${vidas} vidas`);
        reiniciarValores();
    } else {
        nivel++;
    }
    $('.nivel').html(`Nivel: ${nivel - 2}`);
    empezar = false;
    $('.boton').html('Intentarlo de nuevo');
    let i = 0;
    quitarAyuda();
    $('.mensaje').html('');
    cuadros = [];
    let firtNum = Math.floor(Math.random() * (tam * tam) + 1);
    cuadros.push(firtNum);
    pintarCelda(firtNum);
    let time = setInterval(() => {
        let numAleatorio = 0;
        while (true) {
            numAleatorio = Math.floor(Math.random() * (tam * tam) + 1);
            if (cuadros.indexOf(numAleatorio) == -1) {
                cuadros.push(numAleatorio);
                pintarCelda(numAleatorio);
                break;
            }
        }
        i++;
        if (i >= nivel - 1) {
            clearInterval(time);
            setTimeout(() => {
                $('.mensaje').html('Ahora tu...');
                $('.celda').removeClass('tono');
                empezar = true;
                console.log(cuadros);
            }, 1000);
        }

    }, 1500);

}
function cerrarAlerta() {
    $('.alerta').addClass('alerta-close');
}
loadMatriz();

let celdas = document.querySelectorAll('.celda');
let numClick = 0;

$('.vidas').html(`Tienes ${vidas} vidas`);

function reiniciarValores() {
    cuadros = [];
    numClick = 0;
    $('.celda').removeClass('error');
    $('.celda').removeClass('tono');
    $('.vidas').html(`Tienes ${vidas} vidas`);
}
for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click', () => {
        if (empezar) {
            if (i + 1 == cuadros[numClick]) {
                numClick++;
                $(celdas[i]).addClass('tono');
                $('.celda').removeClass('error');
                if (numClick >= nivel) {
                    setTimeout(() => {
                        $('.mensaje').html('Bien Ganaste :)');
                        reiniciarValores();
                        $('.boton').html('Siguiente nivel');
                        perdiste = false;
                    }, 501);
                }
            } else {
                $(celdas[i]).addClass('error');
                if (vidas <= 0) {
                    reiniciarValores();
                    $('.mensaje').html('Perdiste wey :(');
                    $('.boton').html('Volver a intentarlo');
                    perdiste = true;
                    vidas++;
                    nivel = 3;
                }
                vidas--;
                $('.vidas').html(`Tienes ${vidas} vidas`);
            }
        } else {
            $('.alerta').removeClass('alerta-close');
        }
    })
}




