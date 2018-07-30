
  function live() {

const YOUR_KEY = "42d7ffc536a7429682084973de780720";
function sendToMS(callback) {
    canvas.toBlob(function (blob) {
        var xhr = new XMLHttpRequest();
        
        xhr.onload = f=> callback(xhr.response);
        
        xhr.open('POST', 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise');
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", YOUR_KEY);
        xhr.send(blob);
    }, 'image/jpeg', .8);
}

navigator.mediaDevices.getUserMedia({
        video: true
    }).then(s => {
        vid.srcObject = s;
        return vid.play();
    })
    .then(_ => {
        canvas.width = vid.videoWidth;
        canvas.height = vid.videoHeight;
        canvas.getContext('2d').drawImage(vid, 0, 0);
        sendToMS(text => log.textContent = text);
    })
  }