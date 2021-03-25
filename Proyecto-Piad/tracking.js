$(Document).ready(function(){
    'use strict';
     
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var options = { boxColor: "#ff0000" }
var options2 = { boxColor: "#00ff00" }
var options3 = { boxColor: "#0000ff" }
var options4 = { boxColor: "#ffff00" }

var drawBox="";
var drawBox2="";
var drawBox3="";
var drawBox4="";

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    $("#total").text(detections.length);

  if(detections.length==1){
    const box = { x: resizedDetections[0].alignedRect.box.x, y: resizedDetections[0].alignedRect.box.y, width: resizedDetections[0].alignedRect.box.width, height: resizedDetections[0].alignedRect.box.height } 
      drawBox = new faceapi.draw.DrawBox(box, options)
     drawBox.draw(canvas)  

    
  }
  else  if(detections.length==2){
    var box = { x: resizedDetections[0].alignedRect.box.x, y: resizedDetections[0].alignedRect.box.y, width: resizedDetections[0].alignedRect.box.width, height: resizedDetections[0].alignedRect.box.height } 
     drawBox = new faceapi.draw.DrawBox(box, options)
     drawBox.draw(canvas)  

      box = { x: resizedDetections[1].alignedRect.box.x, y: resizedDetections[1].alignedRect.box.y, width: resizedDetections[1].alignedRect.box.width, height: resizedDetections[1].alignedRect.box.height } 
     drawBox = new faceapi.draw.DrawBox(box, options2)
     drawBox.draw(canvas)  
  }
  else  if(detections.length==3){
    var box = { x: resizedDetections[0].alignedRect.box.x, y: resizedDetections[0].alignedRect.box.y, width: resizedDetections[0].alignedRect.box.width, height: resizedDetections[0].alignedRect.box.height } 
     drawBox = new faceapi.draw.DrawBox(box, options)
     drawBox.draw(canvas)  

      var box2 = { x: resizedDetections[1].alignedRect.box.x, y: resizedDetections[1].alignedRect.box.y, width: resizedDetections[1].alignedRect.box.width, height: resizedDetections[1].alignedRect.box.height } 
      drawBox2 = new faceapi.draw.DrawBox(box2, options2)
      drawBox2.draw(canvas)  

       var box3 = { x: resizedDetections[2].alignedRect.box.x, y: resizedDetections[2].alignedRect.box.y, width: resizedDetections[2].alignedRect.box.width, height: resizedDetections[2].alignedRect.box.height } 
      drawBox3 = new faceapi.draw.DrawBox(box3, options3)
      drawBox3.draw(canvas)  
  
  }

  else  if(detections.length==4){
    var box = { x: resizedDetections[0].alignedRect.box.x, y: resizedDetections[0].alignedRect.box.y, width: resizedDetections[0].alignedRect.box.width, height: resizedDetections[0].alignedRect.box.height } 
     drawBox = new faceapi.draw.DrawBox(box, options)
     drawBox.draw(canvas)  

      var box2 = { x: resizedDetections[1].alignedRect.box.x, y: resizedDetections[1].alignedRect.box.y, width: resizedDetections[1].alignedRect.box.width, height: resizedDetections[1].alignedRect.box.height } 
      drawBox2 = new faceapi.draw.DrawBox(box2, options2)
      drawBox2.draw(canvas)  

       var box3 = { x: resizedDetections[2].alignedRect.box.x, y: resizedDetections[2].alignedRect.box.y, width: resizedDetections[2].alignedRect.box.width, height: resizedDetections[2].alignedRect.box.height } 
      drawBox3 = new faceapi.draw.DrawBox(box3, options3)
      drawBox3.draw(canvas)  

      var box4 = { x: resizedDetections[3].alignedRect.box.x, y: resizedDetections[3].alignedRect.box.y, width: resizedDetections[3].alignedRect.box.width, height: resizedDetections[3].alignedRect.box.height } 
      drawBox4 = new faceapi.draw.DrawBox(box4, options4)
      drawBox4.draw(canvas)  

  }
  else  if(detections.length>4){
  
   faceapi.draw.drawDetections(canvas, resizedDetections);
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  }

    
    
  }, 1)
});

  
});
  
   