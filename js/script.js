// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaAparatos = document.querySelector('#buy')

let articulosCarrito = [];

// Confeti
const jsConfetti = new JSConfetti();

cargarEvent();
function cargarEvent() {
    // Cuando agregamos un articulo presionando agregar carrito
    listaAparatos.addEventListener('click', agregarAparatos)

    // Elimina articulos del carrito
    carrito.addEventListener('click', eliminarAparatos)


    // Muestra los articulos de localstorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        mostrarAparatos();
    })
    // Vaciar Carrito
    vaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        articulosCarrito = []
        limpiarHTML();
    })
}

function agregarAparatos(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        aparatosSeleccionado = e.target.parentElement

        leerDatosAparatos(aparatosSeleccionado);
    }
}
function eliminarAparatos(e){
    e.preventDefault()
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-aparatos')){
        // Accedemos al id del articulo que queremos eliminar
        const aparatosId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(aparatos => aparatos.id !== aparatosId);
        mostrarAparatos()
        }
    }


function leerDatosAparatos(aparatos){
    const infoAparatos = {
        imagen: aparatos.querySelector('img').src,
        titulo: aparatos.querySelector('h2').textContent,
        precio: aparatos.querySelector('p').textContent,
        id: aparatos.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(aparatos => aparatos.id === infoAparatos.id);

if(existe){
    const aparatos = articulosCarrito.map(aparatos =>{
        if(aparatos.id === infoAparatos.id){
            aparatos.cantidad++;
            return aparatos;
        }else{
            return curso;
        }
    })
    articulosCarrito = [...aparatos]
}else{
    articulosCarrito = [...articulosCarrito,infoAparatos]
}
    mostrarAparatos();
}


function mostrarAparatos() {

    limpiarHTML();

    articulosCarrito.forEach( aparatos => {
        const{imagen, titulo, precio, cantidad, id} = aparatos;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="50">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                <p id="cantidad">${cantidad}</p>
            </td>
            <td>
                <a href="#" class="borrar-aparatos" data-id="${id}"> X </a>
            </td>
        `

        contenedorCarrito.appendChild(row);
    })

    // Funcion que agrega carrito de compras al storage
    sincronizarStorage();
}

    //ventana de alerta COMPRA exitosa con libreria SWEET ALERT
const btn = document.querySelector("#comprar-carrito");
    btn.addEventListener("click",() =>{
        Swal.fire({
            title:'Felicitaciones',
            text:'¡Compra realizada con exito. Te llegara un mail con el seguimiento!',
            icon:'success',
            confirmButtonText:'Ok',
        });
});

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarHTML() {
    // Mientras contenedorCarrito tenga algo adentro se ejecuta el while
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


// fyq collaps de la Tienda
let collaps = document.querySelectorAll('.faq-container')

collaps.forEach(e => {
    e.addEventListener("click", () =>{
        e.querySelector('.faq-answer').classList.toggle('open');
        e.querySelector('.question').classList.toggle('active');
        e.querySelector('.arrow-container').classList.toggle('up');
    })
});

document.querySelector(".buy-card").addEventListener('click', (e) =>{
    jsConfetti.addConfetti()
    articulosCarrito = []
        limpiarHTML();
})

var form = document.getElementById('form')

form.addEventListener('submit',function(e){
    e.preventDefault()

    var nombre = document.getElementById('nombre').value
    var apellido = document.getElementById('apellido').value
    var dirección = document.getElementById('dirección').value
    var código = document.getElementById('código').value
    var correo = document.getElementById('correo').value
    var mensaje = document.getElementById('mensaje').value

    fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    body: JSON.stringify({
        nombre: nombre,
        apellido:apellido,
        dirección: dirección,
        código: código,
        correo:correo,
        mensaje:mensaje,
        userId:1,
        
    }),
    headers:{
        'content-type': 'application/json;charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    Swal.fire('¡Tu mensaje ha sido enviado con éxito! <br> Te estaremos contestando a la brevedad posible. <br> Gracias!')
    })
