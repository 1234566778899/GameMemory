var firebaseConfig = {
    apiKey: "AIzaSyCl39lg7WHmVJrSiDwnfph_k3kAV4Q0Z9c",
    authDomain: "memorygame-7a2fd.firebaseapp.com",
    projectId: "memorygame-7a2fd",
    storageBucket: "memorygame-7a2fd.appspot.com",
    messagingSenderId: "999535487266",
    appId: "1:999535487266:web:81372d38300610130bdd7b",
    measurementId: "G-Q8F1DH1DED"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);



function agregarDatos(_nombre, _puntuacion) {
    db.collection("Usuarios").add({
        nombre: _nombre,
        puntuacion: _puntuacion,
    })
        .then((docRef) => {
            //console.log("Documento escrito con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error agregando el documento: ", error);
        });
}

function editarDatos(_id, _nombre, _puntuacion) {
    db.collection('Usuarios').doc(_id).update({
        nombre: _nombre,
        puntuacion: _puntuacion,
    })
        .then(() => {
            //console.log('Documento actualizado con éxito');
        })
        .catch((error) => {
            console.error('Error actualizando el documento: ', error);
        });
}

// function eliminarDatos() {
//     db.collection("Usuarios").doc("idDelDocumento").delete()
//         .then(() => {
//             console.log("Documento eliminado con éxito");
//         })
//         .catch((error) => {
//             console.error("Error eliminando el documento: ", error);
//         });
// }