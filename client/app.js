var peer = new Peer({key: 'db4iiswfn8doyldi'})

// // generates a unique id for each user
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
