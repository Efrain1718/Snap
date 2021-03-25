$(Document).ready(function(){
    // Obtener referencia al input y a la imagen

    const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
    $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

    var canvasF=document.getElementById('canvasPicture');
    var canvasOrg=document.getElementById('canvasOrg');

    var contextF=canvasF.getContext('2d');

    const canvasW=canvasF.width;
    const canvasH=canvasF.height;

    var filtros= ["Normal","Blanco y Negro","Espejo","Negativo","Sepia","Rojo","Rojo/Azul","Rojo Menta","Rayos X"];
    let countfilter=0;
    let totalfilter= filtros.length;
    var globalBlob="";
    var imgEspejo=new Image();

    var extencionimg="";
   

    $("#NFilter").text(filtros[0]);
    $("#NFilter").css("color","#FFFFFF");
   

    //cuando cambia el input extraemos el archivo y lo mostramos
    $seleccionArchivos.addEventListener("change", () => {
    const archivos = $seleccionArchivos.files;
    if (!archivos || !archivos.length) {
    //$imagenPrevisualizacion.src = "";
    return;
    }
    const primerArchivo = archivos[0];
    const objectURL = URL.createObjectURL(primerArchivo);
    globalBlob=objectURL;
    imgEspejo.src=objectURL;
   // $imagenPrevisualizacion.src = objectURL;

   extencionimg=getFileExtension(primerArchivo.name);
    putimage(canvasOrg,objectURL);
    putimage(canvasF,objectURL);

    $(".filters").addClass("watch");

    });

    //funcion para obtener el archivo de la imagen
    function getFileExtension(filename) {
        return filename.split('.').pop();
      }

    //funcion para poner la imagen en los 2 canvas
    function putimage(canvas,blob){
        var img = new Image();
        var ctx = canvas.getContext('2d');
        img.onload = function () {
            ctx.drawImage(img,0,0,canvasW, canvasH);
        }
        img.src = blob;
       
    }

    //cuando el boton de adelante es clickeado cambiamos el nombre del filtro y se aplica el nuevo filtro
    $("#nextF").click(function(){
        if(countfilter <totalfilter-1){
            countfilter++;
            $("#NFilter").text(filtros[countfilter]);
            $("#NFilter").css("color","#FFFFFF");

            Filtros(filtros[countfilter].toString());
        }
        else{
            countfilter=0;
            $("#NFilter").text(filtros[countfilter]);
            $("#NFilter").css("color","#FFFFFF");
            Filtros(filtros[countfilter].toString());   
           
        }
    });
    //cuando el boton de atras es clickeado cambiamos el nombre del filtro y se aplica el nuevo filtro
    $("#preF").click(function(){
        if(countfilter>0){
            countfilter--;
            $("#NFilter").text(filtros[countfilter]);
            $("#NFilter").css("color","#FFFFFF");

            Filtros(filtros[countfilter].toString());
        }
        else{
            countfilter=totalfilter-1;
            $("#NFilter").text(filtros[countfilter]);
            $("#NFilter").css("color","#FFFFFF");
           Filtros(filtros[countfilter].toString());   
           
        }
    });

    $("#save").click(function(){
        let foto = canvasF.toDataURL(); //Esta es la foto, en base 64

        let enlace = document.createElement('a'); // Crear un <a>
        enlace.download = "snap_photo.jpg";
        enlace.href = foto;
        enlace.click();
    });


//funcion donde se aplican los filtros
    function Filtros(filtros){

        if(filtros=="Normal"){
            var ctx = canvasF.getContext('2d');
            ctx.drawImage(imgEspejo,0,0,canvasW, canvasH);
           
        }
       
       else if(filtros=="Blanco y Negro"){
        var ctx = canvasOrg.getContext('2d');
        let data= ctx.getImageData(0,0,canvasW,canvasH);
                for(let i =0; i<data.data.length; i++){
                    let red= data.data[i*4];
                    let blue= data.data[i*4+1];
                    let green= data.data[i*4+2];
                    let valor=(red+blue+green)/3

                    data.data[i*4]=valor;
                    data.data[i*4+1]=valor;
                    data.data[i*4+2]=valor;
                }
            contextF.putImageData(data,0,0);
         
        }
        else if(filtros=="Negativo"){
            var ctx = canvasOrg.getContext('2d');
            let data= ctx.getImageData(0,0,canvasW,canvasH);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] = 255 -  data.data[i]; // rojo
                data.data[i + 1] = 255 -  data.data[i + 1]; // verde
                data.data[i + 2] = 255 -  data.data[i + 2]; // azul
              }
             contextF.putImageData(data,0,0);
         
        }

        else if(filtros=="Espejo"){
            var ctx = canvasF.getContext('2d');
                ctx.translate(canvasW,0);
                ctx.scale(-1,1);
                ctx.drawImage(imgEspejo,0,0,canvasW, canvasH);
            normalway();
        }
        else if(filtros=="Sepia"){
            var ctx = canvasOrg.getContext('2d');
            let data= ctx.getImageData(0,0,canvasW,canvasH);
        
            for (var i = 0; i < data.data.length; i += 4) {
                var r, g, b;
                r = data.data[i];
                g = data.data[i + 1];
                b = data.data[i + 2];

                data.data[i] = 0.3 * (r + g + b);
                data.data[i + 1] = 0.25 * (r + g + b);
                data.data[i + 2] = 0.20 * (r + g + b);
              }
             contextF.putImageData(data,0,0);

        }

        else if(filtros=="Rojo"){
            //este es rojo con detalles negros
            //para hacer rojo con detalles "normales"/blancos se cambia el rojo quitando el 255 y agregando el +
            var ctx = canvasOrg.getContext('2d');
            let data= ctx.getImageData(0,0,canvasW,canvasH);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] = +  data.data[i]; // rojo
                data.data[i + 1] = -  data.data[i]; // verde
                data.data[i + 2] =  -  data.data[i]; // azul

              }
             contextF.putImageData(data,0,0);

        }
        else if(filtros=="Rojo/Azul"){
            var ctx = canvasOrg.getContext('2d');
            let data= ctx.getImageData(0,0,canvasW,canvasH);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] =255 -  data.data[i]; // rojo
                data.data[i + 1] = -  data.data[i]; // verde
                data.data[i + 2] = 255-  data.data[i]; // azul

              }
             contextF.putImageData(data,0,0);

        }

        
        else if(filtros=="Rojo Menta"){
            var ctx = canvasOrg.getContext('2d');
            let data= ctx.getImageData(0,0,canvasW,canvasH);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] = 255-  data.data[i]; // rojo
                data.data[i + 1] =  255-  data.data[i]; // verde
                data.data[i + 2] = 255 - data.data[i]; // azul
    
              }
             contextF.putImageData(data,0,0);

        }
        else if(filtros=="Rayos X"){
            var ctx = canvasOrg.getContext('2d');
            let data= ctx.getImageData(0,0,canvasW,canvasH);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] =255 -  data.data[i]; // rojo
                data.data[i + 1] = + data.data[i]; // verde
                data.data[i + 2] = + data.data[i]; // azul
    
              }
             contextF.putImageData(data,0,0);

        }
    }
        

    function normalway(){
        var ctx = canvasF.getContext('2d');
 
        ctx.translate(canvasW,0);
        ctx.scale(-1,1);

    }
});
