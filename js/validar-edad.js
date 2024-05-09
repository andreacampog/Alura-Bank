export default function esMayorDeEdad(campo){
    const fechaNacimiento = new Date(campo.value); //creo un objeto fecha con la fecha que el usuario suministra
    
    if(!validarEdad(fechaNacimiento)){
        campo.setCustomValidity('Necesitas ser mayor de edad')
    }
    console.log(fechaNacimiento);
    validarEdad(fechaNacimiento);
    console.log(validarEdad(fechaNacimiento))


}

function validarEdad(fecha){
    const fechaActual = new Date();  //objeto con la fecha de hoy 
    const fechaMas18 = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(),fecha.getUTCDate());

    return fechaActual >= fechaMas18;  //devuelve true si es mayor de edad
}