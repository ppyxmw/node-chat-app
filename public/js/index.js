var socket = io();

socket.on('roomList', function (rooms) {
  
  var group = jQuery('<optgroup></optgroup>');
  
  group.append(jQuery('<option></option>').text(""));

  rooms.forEach(function (room) {
    group.append(jQuery('<option></option>').text(room));
  });
  jQuery('#rooms').html(group);
});