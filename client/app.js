//*******************//
// WebRTC Connection //
//*******************//

var peer = new Peer({key: 'db4iiswfn8doyldi'})

// generates a unique id for each user
peer.on('open', function(id) {
  $('#host_id').text(id)
});

peer.on('connection', connect);

// function for what happens on establishment of connection
function connect(conn) {
  $('#guest_id').val(conn.peer);
};

// jQuery event that established connection
$().ready(function() {
  $('#connect').click(function() {
    var c = peer.connect($('#guest_id').val())
    c.on('open', function() {
      connect(c)
    });
  });
});


//*******************//
//   Webcam Access   //
//*******************//
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');

function successCallback(stream) {
  window.stream = stream; // stream available to console
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
