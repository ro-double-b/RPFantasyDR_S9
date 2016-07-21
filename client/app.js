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
  console.log('test this out man')
  call.answer(video)
});

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
  // sends user stream
  $('#sendVideo').click(function() {
    console.log('step 1')
    console.log('peer: ', peer.call($('#guest_id').val(), window.stream))
    var call = peer.call($('#guest_id').val(), window.stream)
    call.on('stream', function(stream) {
      console.log('step 2')
      console.log(stream)
      $('remoteVideo').prop('src', URL.createObjectURL(stream))
    })
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
    return video.src = window.URL.createObjectURL(stream);
  } else {
    return video.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

var localStream = navigator.getUserMedia(constraints, successCallback, errorCallback);



