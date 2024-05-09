//33-83747222-4  cuil valido
//11-83747222-4 cuil invalido
//00000000000 cuil con valores repetidos


export default function esUnCuil(campo){
    const cuil = campo.value.replace(/[-\/]/g,""); //si tiene guion o barra lo reemplazo por un string vacio
    
    if(tieneNumerosRepetidos(cuil)){
        console.log("Valores repetidos");
        campo.setCustomValidity('valores repetidos');
    }else{
        if (validarPrimerosDigitos(cuil) && validarDigitoVerificador(cuil)){
            console.log('cuil valido');
        }else{
            console.log('cuil no existe');
            campo.setCustomValidity('Cuil no existe')
        }
    }
    
    tieneNumerosRepetidos(cuil);
    //console.log(cuil);
    
    //console.log(tieneNumerosRepetidos(cuil));
    validarPrimerosDigitos(cuil);
    //console.log(primerosDigitos(cuil));
}

function tieneNumerosRepetidos(cuil){
    //devuelve true o false si tiene estos patrones

    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    return numerosRepetidos.includes(cuil); 
}


//validar los dos primeros dígitos
function validarPrimerosDigitos(cuil){
    let primerosDigitos = cuil.substring(0,2)//metodo recibe dos parametros y extrae caracteres en este caso del 0 al 2    
    let digitosValidos = ['20','23','24','27','30','33','34'];

    return digitosValidos.includes(primerosDigitos); //digitos validos incluye los primeros digitos ingresados? devuelve true o false

}

function validarDigitoVerificador(cuil){
    let acumulado = 0;
    const factores =[5,4,3,2,7,6,5,4,3,2];  
    
    for(let i=0; i<10; i++){
        acumulado += parseInt(cuil[i],10) * factores[i];
    }

    let validadorTeorico = 11-(acumulado % 11); // = 11-(153%11)=1

    if (validadorTeorico === 11){
        validadorTeorico= 0;
    }else if(validadorTeorico === 10){
        validadorTeorico =9;
    }

    const digitoVerificador = parseInt(cuil[10],10); //capturo el ultimo digito y lo vuelvo numerico

    return digitoVerificador === validadorTeorico; //
}

