var connect
var peer = new Peer({key: 'db4iiswfn8doyldi'})

peer.on('open', function(id) {
  $('#host_id').text(id)
})