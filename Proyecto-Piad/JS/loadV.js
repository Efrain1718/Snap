$(Document).ready(function(){
    // Obtener referencia al input y a la imagen

    const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
    $VPrevisualizacion = document.querySelector("#videopre");

    var canvas=document.getElementById('canvasPicture');
    var context=canvas.getContext('2d');
    const canvasW=canvas.width;
    const canvasH=canvas.height;

    var filtros= ["Normal","Blanco y Negro","Espejo","Negativo","Sepia","Rojo","Rojo/Azul","Rojo Menta","Rayos X"];
    let countfilter=0;
    let totalfilter= filtros.length;
    var imgEspejo=new Image();
    var globalFrame="";

    var inmirror=false;

    $("#NFilter").text(filtros[0]);
    $("#NFilter").css("color","#FFFFFF");

    $seleccionArchivos.addEventListener("change", () => {
            // Los archivos seleccionados, pueden ser muchos o uno
            const archivos = $seleccionArchivos.files;
            // Si no hay archivos salimos de la función y quitamos la imagen
            if (!archivos || !archivos.length) {
            $VPrevisualizacion.src = "";
            return;
            }
            // Ahora tomamos el primer archivo, el cual vamos a previsualizar
            const primerArchivo = archivos[0];
            // Lo convertimos a un objeto de tipo objectURL
            const objectURL = URL.createObjectURL(primerArchivo);
            // Y a la fuente de la imagen le ponemos el objectURL
        $VPrevisualizacion.src = objectURL;

        $VPrevisualizacion.addEventListener('play', function(){
          Normal();
        });
        $(".filters").addClass("watch");
    });


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
    
    function Filtros(filtros){

        if(filtros=="Normal"){
            
            cancelAnimationFrame(globalFrame);
            globalFrame= requestAnimationFrame(Normal);  
           
        }
       else if(filtros=="Blanco y Negro"){
       if(inmirror==true){
            espejo();
            inmirror=false;
        }
        cancelAnimationFrame(globalFrame);
        globalFrame= requestAnimationFrame(ByW);  
        }
        else if(filtros=="Espejo"){
            cancelAnimationFrame(globalFrame);
            espejo();
            inmirror=true;
                
        }
        else if(filtros=="Negativo"){
            if(inmirror==true){
                espejo();
                inmirror=false;
            }
            cancelAnimationFrame(globalFrame);
                globalFrame= requestAnimationFrame(negative);  
                 
        }
        else if(filtros=="Sepia"){
            cancelAnimationFrame(globalFrame);
            globalFrame=requestAnimationFrame(sepia);

        }

        else if(filtros=="Rojo"){
            cancelAnimationFrame(globalFrame);
            globalFrame=requestAnimationFrame(rojo);
        }
        else if(filtros=="Rojo/Azul"){
            cancelAnimationFrame(globalFrame);
            globalFrame=requestAnimationFrame(rojo_azul);
        }
        else if(filtros=="Rojo Menta"){
            cancelAnimationFrame(globalFrame);
            globalFrame=requestAnimationFrame(rojo_meta);
        }
        else if(filtros=="Rayos X"){
            cancelAnimationFrame(globalFrame);
            globalFrame=requestAnimationFrame(xray);
        }

    }

    function Normal (){
     
        requestAnimationFrame(Normal);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);
   }   

    function ByW (){
     
        requestAnimationFrame(ByW);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);

      let data= context.getImageData(0,0,canvasW,canvasH);
      for(let i =0; i<data.data.length; i++){
        let red= data.data[i*4];
        let blue= data.data[i*4+1];
        let green= data.data[i*4+2];
        let valor=(red+blue+green)/3

        data.data[i*4]=valor;
        data.data[i*4+1]=valor;
        data.data[i*4+2]=valor;
    }
        context.putImageData(data,0,0);  
   }     

   
    function espejo (){

        context.translate(canvasW,0);
        context.scale(-1,1);
        context.drawImage($VPrevisualizacion,0,0,canvasW, canvasH);
    
   }     


    function negative (){
     
          requestAnimationFrame(negative);
          context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);

        let data= context.getImageData(0,0,canvasW,canvasH);
        for (var i = 0; i < data.data.length; i += 4) {
            data.data[i] = 255 -  data.data[i]; // rojo
            data.data[i + 1] = 255 -  data.data[i + 1]; // verde
            data.data[i + 2] = 255 -  data.data[i + 2]; // azul
          }
          context.putImageData(data,0,0);  
     }     

     function rojo (){
        requestAnimationFrame(rojo);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);
        let data= context.getImageData(0,0,canvasW,canvasH);
        for (var i = 0; i < data.data.length; i += 4) {
            data.data[i] = +  data.data[i]; // rojo
            data.data[i + 1] =  -  data.data[i]; // verde
            data.data[i + 2] =  -  data.data[i]; // azul

          }
          context.putImageData(data,0,0);
     } 

     
     function sepia (){
        requestAnimationFrame(sepia);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);
        let data= context.getImageData(0,0,canvasW,canvasH);
        for (var i = 0; i < data.data.length; i += 4) {
            var r, g, b;
            r = data.data[i];
            g = data.data[i + 1];
            b = data.data[i + 2];

            data.data[i] = 0.3 * (r + g + b);
            data.data[i + 1] = 0.25 * (r + g + b);
            data.data[i + 2] = 0.20 * (r + g + b);
          }
          context.putImageData(data,0,0);
     } 

     function rojo_azul (){
        requestAnimationFrame(rojo_azul);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);
        let data= context.getImageData(0,0,canvasW,canvasH);
        for (var i = 0; i < data.data.length; i += 4) {
            data.data[i] =255 -  data.data[i]; // rojo
            data.data[i + 1] = -  data.data[i]; // verde
            data.data[i + 2] = 255-  data.data[i]; // azul

          }
          context.putImageData(data,0,0);
     } 

     function rojo_meta (){
        requestAnimationFrame(rojo_meta);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);
        let data= context.getImageData(0,0,canvasW,canvasH);
        for (var i = 0; i < data.data.length; i += 4) {
            data.data[i] = 255-  data.data[i]; // rojo
            data.data[i + 1] =  255-  data.data[i]; // verde
            data.data[i + 2] = 255 - data.data[i]; // azul

          }
          context.putImageData(data,0,0);
     } 
     function xray (){
        requestAnimationFrame(xray);
        context.drawImage($VPrevisualizacion, 0, 0, canvasW,canvasH);
        let data= context.getImageData(0,0,canvasW,canvasH);
        for (var i = 0; i < data.data.length; i += 4) {
            data.data[i] =255 -  data.data[i]; // rojo
            data.data[i + 1] = + data.data[i]; // verde
            data.data[i + 2] = + data.data[i]; // azul

          }
          context.putImageData(data,0,0);
     } 
});
