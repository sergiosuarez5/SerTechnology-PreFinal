const bdark = document.querySelector('#dark')
const body = document.querySelector("body")
const btnSwitch = document.querySelector(".switch")

load();

bdark.addEventListener("click", e =>{
    body.classList.toggle('darkmode')
    store(body.classList.contains('darkmode'));
});


// Hace referencia al localStorage
function load(){
    const darkmode = localStorage.getItem('darkmode');

    if(!darkmode){
        store('false')
    }else if(darkmode == "true"){
        body.classList.add('darkmode')
        body.classList.add('active')
    }
}

// Nos permite guardar el valor
function store(value){
    localStorage.setItem('darkmode', value);

}

btnSwitch.addEventListener('click', () =>{
    btnSwitch.classList.toggle('active')
})