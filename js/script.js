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
    // Cuando agregamos un curso presionando agregar carrito
    listaAparatos.addEventListener('click', agregarAparatos)

    // Elimina articulos del carrito
    carrito.addEventListener('click', eliminarAparatos)


    // Muestra los cursos de localstorage
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
        const cursoId = e.target.getAttribute('data-id');
        
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
                <img src="${imagen}" width="100">
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
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `

        contenedorCarrito.appendChild(row);
    })

    // Funcion que agrega carrito de compras al storage
    sincronizarStorage();
}

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
