import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import {tiposError, mensajes} from "./customErrors.js"

//Capturo todos los campos del formulario con atributo required
const campoDeFormulario = document.querySelectorAll('[required');
const formulario = document.querySelector('[data-formulario]');

//ejecuto una funcion cuando ocurra el evento
formulario.addEventListener('submit', (e)=> {
    e.preventDefault();//prevengo que el formulario se recargue al presionar enviar  para asi redireccionar a la página de foto
    debugger;
    try{
        const listaRespuestas = {    
            nombre: e.target.elements['nombre'].value,
            email: e.target.elements['email'].value,
            identificacion: e.target.elements['identificacion'].value,
            cuil: e.target.elements['cuil'].value,
            fecha_nacimiento: e.target.elements['fecha_nacimiento'].value,            
        }
               
        //almaceno en el localStorage(clave, valor) => (registro, listaRespuestas) el valor se debe convertir a json para q el servidor comprenda
        localStorage.setItem('registro',JSON.stringify(listaRespuestas));
        
        //redirijo a la siguiente pagina
        window.location.href= './abrir-cuenta-form-2.html';

    }catch(error){
    console.error('Error al guardar los datos en el localstorage',error);
    }
});


//El evento blur ocurre cuando le quito el foco al campo (hago click fuera de el)
campoDeFormulario.forEach(campo=> {
    campo.addEventListener('blur',()=> verificarCampo(campo))
    campo.addEventListener('invalid', evento=> evento.preventDefault()) //evitar comportamiento por defecto al escuchar un invalido
});

function verificarCampo(campo){  

    let mensaje ='';
    campo.setCustomValidity('');

    if(campo.name == "cuil" && campo.value.length >=11){
        esUnCuil(campo);
    }
    if(campo.name == 'fecha_nacimiento' && campo.value !==" "){
        esMayorDeEdad(campo);
    }
    //console.log(campo.validity);
    tiposError.forEach(error=> {
        if(campo.validity[error]){
            mensaje = mensajes[campo.name][error]; 
            console.log(mensaje);
        }
    })
    //con esto selecciono el mensaje de error de los input 
    //con el parenNode traigo solo el span que corresponde a cada campo 
    const mensajeError = campo.parentNode.querySelector('.mensaje-error');
    const validarInputCheck = campo.checkValidity();  //Es valido?

    if(!validarInputCheck){ 
        mensajeError.textContent = mensaje  //si no es valido imprime el mensaje
    }else{
        mensajeError.textContent = "" //si es valido no imprime nada 
    }
}



