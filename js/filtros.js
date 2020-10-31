var filtros = document.querySelectorAll('input');
var buscarTitulo = filtros[0];
var buscarAutor = filtros[1];
var buscarPrecio = filtros[2];

var botones = document.querySelectorAll('button');
var botonBuscar = botones[0];
var botonClear = botones[1];

var input = document.querySelectorAll('input');
var inputTitulo = input[0];
var inputAutor = input[1];
var inputTematica = input[2];

var p = document.querySelectorAll('p');
var pl = p[3];

var libros = document.querySelectorAll('section');

function getLibrosFilter() {
    var librosFiltrados = [];
    var aux = [];

    //Filtro por Autor
    if (inputAutor.value != '') {
        //console.log("Autro: ", inputAutor.value);
        libros.forEach(libro => {
            var splt = libro.outerHTML.split("Autor:</b> ");
            splt = splt[1].split("</p>");
            if (splt[0].toLowerCase().includes(inputAutor.value.toLowerCase())) {
                librosFiltrados.push(libro);
                console.log(libro);
            }
        });
    }

    //Filtramos por Título
    if (inputTitulo.value != '') {
        //console.log("Titulo: ", inputTitulo.value);
        aux = [];
        //Si ya hemos filtrado  antes
        if (librosFiltrados.length > 0) {
            aux = librosFiltrados;
            librosFiltrados = [];
        } else {
            aux = libros;
        }

        aux.forEach(libro => {
            var splt = libro.outerHTML.split("<h1>");
            splt = splt[1].split("</h1>");
            if (splt[0].toLowerCase().includes(inputTitulo.value.toLowerCase())) {
                librosFiltrados.push(libro);
            }
        });
    }

    //Filtramos por Temática
    if (inputTematica.value != '') {
        //console.log("Temática: ", inputTematica.value);
        aux = [];
        //Si hemos filtrado ya antes
        if (librosFiltrados.length > 0) {
            aux = librosFiltrados;
            librosFiltrados = [];
        } else {
            aux = libros;
        }
        aux.forEach(libro => {
            var splt = libro.outerHTML.split("Temática:</b> ");
            splt = splt[1].split("</p>");
            if (splt[0].toLowerCase().includes(inputTematica.value.toLowerCase())) {
                librosFiltrados.push(libro);
            }
        });
    }
    return librosFiltrados;
}

function reset() {
    libros.forEach(libro => {
        libro.style.display = 'none';
    });

}

botonBuscar.addEventListener("click", event => {
    reset();
    var librosFiltrados = getLibrosFilter();

    if (librosFiltrados.length > 0) {
        pl.textContent = '';
        librosFiltrados.forEach(libro => {
            libro.style.display = '';
        });
    } else {
        pl.textContent = 'Lo siento, no se ha encontrado ningún libro con esos filtros :(';
    }
    event.preventDefault();
});

botonClear.addEventListener("click", event => {
    reset();
    input.forEach(element => {
        element.value = '';
    });
    pl.textContent = '¿Quiere buscar algún libro en concreto? Filtra por su título, autor o temática';
    event.preventDefault();

});
