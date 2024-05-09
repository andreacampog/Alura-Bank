const botonAbrirCamara = document.querySelector('[data-video-boton]');
const video = document.querySelector('[data-video]');
const campoCamara = document.querySelector('[data-camera]');
const botonTomarFoto = document.querySelector('[data-tomar-foto]');
const mensaje = document.querySelector('[data-mensaje]');
const canvas = document.querySelector('[data-video-canvas]');
const botonEnviar= document.querySelector('[data-enviar]');

let imgUrl = '';


//esta funcion es asincrona porque se debe esperar que el usuario permita el uso de la camara
botonAbrirCamara.addEventListener('click', async ()=> {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({
        video:true, 
        audio:false
    });

    botonAbrirCamara.style.display='none';
    campoCamara.style.display='block';
    video.srcObject= iniciarVideo; //muestra el video en pantalla
});

botonTomarFoto.addEventListener('click', ()=>{
    canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);    
    imgUrl=canvas.toDataURL('image/jpeg');
    campoCamara.style.display='none'; //oculto sin ocupar espacio
    mensaje.style.display='block';
});

botonEnviar.addEventListener('click',()=>{
    const recibirDatos = localStorage.getItem('registro'); //traigo del localStorage la clave registro
    const convertirDatos = JSON.parse(recibirDatos); //los paso de JSON a string
    
    convertirDatos.img_url= imgUrl;

    localStorage.setItem('registro',JSON.stringify(convertirDatos));
    window.location.href='./abrir-cuenta-form-3.html';
});