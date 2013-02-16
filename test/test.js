
  

  var conn;
  // Connect to PeerJS, have server assign an ID instead of providing one
  var peer = new Peer({debug: true, host: 'localhost', port: 8888});
  peer.on('open', function(id){
    $('#pid').text(id);
  });  
  // Await connections from others
  peer.on('connection', connect);
  function connect(c) {
    $('#chat_area').show();
    conn = c;
    $('#messages').empty().append('Now chatting with ' + conn.peer);
    conn.on('data', function(data){
      $('#messages').append('<br>' + conn.peer + ':<br>' + data);
    });
    conn.on('close', function(err){ alert(conn.peer + ' has left the chat.') });
  }
  $(document).ready(function() {
    // Conect to a peer
    $('#connect').click(function(){
      var c = peer.connect($('#rid').val());
      c.on('open', function(){
        connect(c);
      });
      c.on('error', function(err){ alert(err) });  
    });
    // Send a chat message
    $('#send').click(function(){
      var msg = $('#text').val();
      conn.send(msg);
      $('#messages').append('<br>You:<br>' + msg);
      $('#text').val('');
    });
    // Show browser version
    $('#browsers').text(navigator.userAgent);
  });