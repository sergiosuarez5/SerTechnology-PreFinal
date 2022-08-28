// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#buy')
let articulosCarrito = [];

// Confeti
const jsConfetti = new JSConfetti();


cargarEvent();
function cargarEvent() {
    // Cuando agregamos un curso presionando agregar carrito
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)


    // Muestra los cursos de localstorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        mostrarCurso();
    })
    // Vaciar Carrito
    vaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        articulosCarrito = []
        limpiarHTML();
    })
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        cursoSeleccionado = e.target.parentElement

        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    e.preventDefault()
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        // Accedemos al id del curso que queremos eliminar
        const cursoId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        mostrarCurso()
        }
    }


function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h2').textContent,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

if(existe){
    const cursos = articulosCarrito.map(curso =>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso;
        }else{
            return curso;
        }
    })
    articulosCarrito = [...cursos]
}else{
    articulosCarrito = [...articulosCarrito,infoCurso]
}
    mostrarCurso();
}


function mostrarCurso() {

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const{imagen, titulo, precio, cantidad, id} = curso;

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
