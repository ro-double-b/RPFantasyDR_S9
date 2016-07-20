//*******************//
// WebRTC Connection //
//*******************//

var conn
var peer = new Peer({key: 'db4iiswfn8doyldi'})

// generates a unique id for each user
peer.on('open', function(id) {
  $('#host_id').text(id)
});

peer.on('connection', connect);
peer.on('call', function(call) {
  console.log(window.stream)
  console.log('answer the call man')
  call.answer(window.stream)
})
peer.on('stream', function(stream) {
  $('#remoteVideo').append(stream)
})

// function for what happens on establishment of connection
function connect(c) {
  // connects the webRTC connection
  conn = c
  console.log('Connection established with user: ', conn.peer)
  $('#guest_id').val(c.peer);
  // recieve data over connection
  conn.on('data', function(data) {
    $('#sendData').val($('#sendData').val()+data)
  })
};


$().ready(function() {
  // establishes a connection
  $('#connect').click(function() {
    console.log('Establishing connection with uesr: ', $('#guest_id').val())
    var c = peer.connect($('#guest_id').val())
    c.on('open', function() {
      connect(c)
    });
  });
  // sends data over that connection
  $('#send').click(function() {
    conn.send($('#sendData').val())
  })

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

var video = document.querySelector('#localVideo');

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

var hello = navigator.getUserMedia(constraints, successCallback, errorCallback);
