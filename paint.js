let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

//Diferentes variables usadas más adelante para dibujar
let pintar = "black";
let grosor_pincel = "2";
let accion_dibujar = false;

let restore_array = []; // Array vacio para poder deshacer / limpiar canvas
let index = -1; // Para saber donde estamos dentro del array

function cambiar_color(element){ //Cambiamos el color del pincel en función de cual hayamos seleccionado en el html
    pintar = element.style.background;
}

function goma(element){ //Cambiamos a goma cuando pulsemos el botón goma poniendo el color de color blanco
    pintar = element.style.color;
}

// Creamos mousedown, mousemove, mouseup y mouseout para asociarlos a sus respectivas funciones
canvas.addEventListener("mousedown", empezar); // Presionar mouse = empezar
canvas.addEventListener("mousemove", dibujar); // Mover mouse = dibujar
canvas.addEventListener("mouseup", parar); // Levantar mouse = parar
canvas.addEventListener("mouseout", parar); // Sacar mouse (cuando salga del canvas) = parar

//Creamos función de dibuajar para poner accion dibujar = true y así poder dibujar
function empezar(event) {
    accion_dibujar = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop);
}

// Función para dibujar
function dibujar(event){
    if ( accion_dibujar) { // Si acción dibujar === true, empezará a dibujar con los siguentes parámetros
        context.lineTo(event.clientX - canvas.offsetLeft,
                        event.clientY - canvas.offsetTop);
        context.strokeStyle = pintar; // Color pincel
        context.lineWidth = grosor_pincel; // Grosor pincel
        context.lineCap = "round"; // Tipo de pincel
        context.lineJoin = "round";
        context.stroke(); // Para dibujar la acción
    }
}

//Función para parar de dibujar por si levantamos el mouse o salimos del canvas
function parar(event) {
    if ( accion_dibujar ){
        context.stroke(); //Cerramos la ruta creada en la función "empezar"
        context.closePath();
        accion_dibujar = false; // Accion dibujar = false para que no siga pintando sin desearlo.
    }
    if ( event.type != 'mouseout') { // Creamos un if para subir +=1 al array si la función es diferente de mouseout
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        //.push traerá el elemento en la última posición de una posición del array
        // getImageData nos traerá el contexto como en una ruta de imagen (Necesitamos las coordenadas x, y. Y el ancho y alto)
        index += 1;
    }
}

// Función para añadir texto con un prompt
function texto(event){
  canvas.addEventListener("click", texto);
  let txt = prompt('Escribe');
  context.save();
  context.fillStyle = pintar;
  context.font=`${grosor_pincel}px Arial`; //Llamamos a la funcion grosor_pincel para poner los pixeles del grosor y fuente Arial.
  context.fillText(txt, event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
  context.closePath();
  canvas.removeEventListener("click", texto);
}

/*Todas las funciones de dibujar siguen el mismo patrón:
1. Añadimos un eventListener para cuando hagamos click en el HTML, llame a la funcion.
2. Empezamos una nueva ruta.
3. Dibujamos la forma, ya sea con lineTo, arc, rect...
4. Dibujamos la figura con el .stroke, que printa la ruta que hayamos hecho anteriormente.
5. Quitamos el EventListener añadido anteriormente para que salga de la función y la dibuje todo el rato.
*/
function cuadrado(event){
  canvas.addEventListener("click", cuadrado);
	context.beginPath();
	context.rect(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop, grosor_pincel ,grosor_pincel);
	context.stroke();
  canvas.removeEventListener("click", cuadrado);
}

//Misma función que el cuadrado pero multiplicando x2 la anchura.
function rectangulo(event){
	canvas.addEventListener("click", rectangulo);
	context.beginPath();
	context.rect(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop, grosor_pincel*2 ,grosor_pincel);
	context.stroke();
  canvas.removeEventListener("click", rectangulo);
}

function triangulo(event){
    canvas.addEventListener("click", triangulo);
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
    context.lineTo(event.clientX - canvas.offsetLeft+5,(event.clientY - canvas.offsetTop+145)-grosor_pincel);
    context.lineTo((event.clientX - canvas.offsetLeft+145)-grosor_pincel,(event.clientY - canvas.offsetTop+145)-grosor_pincel);
    context.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
    context.stroke();
    canvas.removeEventListener("click", triangulo);
}

function circulo(event){
  canvas.addEventListener("click", circulo);
  context.beginPath();
  context.arc(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop,grosor_pincel , 2 * Math.PI, 0);
  // context.arc =(coordenada x, coordenada y, radio, angulo incial (2*3,1415...) y angulo final. )
  context.stroke();
  context.closePath();
  canvas.removeEventListener("click", circulo);
}


//Misma función que el pintar normal, pero con un lineDash que dará una separación en la línea para crear una discontinua
function dibujarEspacio(event){
    context.setLineDash([10, 10]); // Tamaño de las discontinuidades
      context.lineTo(event.clientX - canvas.offsetLeft,
                      event.clientY - canvas.offsetTop);
      context.strokeStyle = pintar;
      context.lineWidth = grosor_pincel;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
}

//Tenemos que volver a crear la función de dibujar para poder volver a ella una vez usado otro método de pintar
function dibujarNormal(event){ 
  context.setLineDash([0, 0]);
    context.lineTo(event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop);
    context.strokeStyle = pintar;
    context.lineWidth = grosor_pincel;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
}
/*BITMAP*/

  function SubirFoto(){
    var img = new Image(); // Creamos una nueva imagen
    img.onload = function() { // Creamos un onload para que se ejecute la función cuando cargue la imagen
      // Tamaño del canvas
      canvas.width = 1360;
      canvas.height = 400;
      //Dibujar imagen
      context.drawImage(this, 0, 0);
    }
    img.src = "fondo-del-cielo-con-el-efecto-de-una-imagen-alargada-profundizada-138221646.jpg";
  }

  function byn(){
    // Cogemos los datos de la imagen con la funcion getImageData
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imgData.data;
    // Miramos todos los pixeles que hemos llamado anteriormente con pixels = imgData.data
    // Descomponemos los pixeles en los 4 valores rgba que tienen
    for (var i = 0; i < pixels.length; i += 4) {
      // Hacemos la media de los primeros 3 valores con: ((r+g+b)/3)
      var med = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      // Los ponemos con su valor correspondiente de la media (r = g = b = med)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = med;
    }
    // Volvemos a dibujar la imagen nueva que hemos creado despues de pasar por cada pixel
    context.putImageData(imgData, 0, 0);
  }

  
  function negativo(){
    // Cogemos los datos de la imagen con la funcion getImageData
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imgData.data;
    // Miramos todos los pixeles que hemos llamado anteriormente con pixels = imgData.data
    // Descomponemos los pixeles en los 4 valores rgba que tienen
    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i] = 255 - pixels[i]; // red
      pixels[i+1] = 255 - pixels[i+1]; // green
      pixels[i+2] = 255 - pixels[i+2]; // blue
      }
    // Volvemos a dibujar la imagen nueva que hemos creado despues de pasar por cada pixel
    context.putImageData(imgData, 0, 0);
  }


/*No varia*/

function limpiar() { //Función limpiar
    context.fillStyle = start_background_color; // Rellenaremos todo con el color "start_background_color (blanco)"
    context.clearRect(0, 0, canvas.width, canvas.height); // Funcion para limpiar el canvas con las mismas coordenadas que el mismo
    context.fillRect(0, 0, canvas.width, canvas.height); // Rellenamos el canvas con los parametros establecidos anteriormente

    restore_array = []; // Reseteamos el array
    index = -1; // Ponemos el index (veces que hemos pintado) en -1
}

/*No varia*/

function deshacer() { // Función deshacer con el array que hemos creado para poder deshacer el array y retroceder un paso.
    if( index <= 0 ){ //Si no hemos pintado, en vez de restaurar el array limpiará todo el canvas.
        limpiar();
    } else{ //Si no, lo que hará será retroceder un paso, deshaciendo así el anterior.
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}

/*No varia*/
download.addEventListener('click', function() { // Función descargar imagen al pulsar el botón download
    const link = document.createElement('a'); // Creamos el link para poder descargarla
    link.download = 'download.png'; // El nombre del archivo descargado
    link.href = canvas.toDataURL(); // Convertimos el canvas a DataUrl para poder descargarla
    link.click(); // Al hacer click descargamos el archivo
});