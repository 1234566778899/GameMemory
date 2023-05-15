let tam = 5;
let audio = document.getElementById("myAudio");
let empezar = false;
let cuadros = [];
let nivel = 2;
let vidas = 3;
let perdiste = true;
let user = '';
$('.nivel').html(`Nivel: ${nivel - 1}`);
function ingresar() {
    let username = document.querySelector('.username');
    if (username.value.trim() == "" || username == null) {
        $('.mensaje-ingreso').css('display', 'block');

    } else {
        user = username.value;
        $('.toggle').css('display', 'none');
        localStorage.setItem('user', user);
        $('.user-icon').html(user);
    }
}
function obtenerDatos() {
    $('.puntuacion').html('');
    db.collection("Usuarios").get().then((querySnapshot) => {
        let usuarios = [];
        querySnapshot.forEach((doc) => {
            usuarios.push({
                id: doc.id,
                nombre: doc.data().nombre,
                puntuacion: doc.data().puntuacion
            });
        });
        usuarios.sort(function (a, b) {
            return b.puntuacion - a.puntuacion;
        });
        if (usuarios.length >= 50) {
            for (let i = 0; i < 50; i++) {
                $('.puntuacion').append(`
                <tr class="user">
                    <td>${i + 1}</td>
                    <td>${usuarios[i].nombre}</td>
                    <td>${usuarios[i].puntuacion}</td>
                </tr>
                `);
            }
        } else {
            for (let i = 0; i < usuarios.length; i++) {
                $('.puntuacion').append(`
                <tr class="user">
                    <td>${i + 1}</td>
                    <td>${usuarios[i].nombre}</td>
                    <td>${usuarios[i].puntuacion}</td>
                </tr>
                `);
            }
        }
    }).catch((error) => {
        console.error("Error obteniendo los documentos: ", error);
    });
}

obtenerDatos();

function loadMatriz() {
    if (localStorage.getItem('user')) {
        $('.toggle').css('display', 'none');
        user = localStorage.getItem('user');
        $('.user-icon').html(`${user}`);
    }

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
            }, 1000);
        }

    }, 1500);
//hola
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
function guardarPuntuacion() {
    db.collection("Usuarios").where("nombre", "==", user)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                editarDatos(querySnapshot.docs[0].id, user, nivel - 2);
            } else {
                agregarDatos(user, nivel - 2);
            }
        })
        .catch((error) => {
            console.log("Error obteniendo los documentos: ", error);
        });
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
                        $('.mensaje').html('Bien hecho');
                        reiniciarValores();
                        $('.boton').html('Siguiente nivel');
                        perdiste = false;
                    }, 501);
                }
            } else {
                $(celdas[i]).addClass('error');
                if (vidas <= 0) {
                    reiniciarValores();
                    $('.mensaje').html('Perdiste');
                    $('.boton').html('Volver a intentarlo');

                    guardarPuntuacion();
                    obtenerDatos();
                    alert('Perdiste, tu puntuación se ha guardado');
                    perdiste = true;
                    vidas++;
                }
                vidas--;
                $('.vidas').html(`Tienes ${vidas} vidas`);
            }
        } else {
            $('.alerta').removeClass('alerta-close');
        }
    })
}




