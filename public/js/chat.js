/*global jQuery*/ 
var socket = io();

function scrollToBottom () {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight +  lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}
      
socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  
  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      //no error
      var room = `<h3>${params.room} room</h3>`;
      jQuery('#room').append(room);
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  //this replaces the old list, by changing the html
  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  
  jQuery('#messages').append(html);
  scrollToBottom();
});

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
      messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }
  
  locationButton.attr('disabled', 'disabled').text('sending location...');
  
  navigator.geolocation.getCurrentPosition(function (position) {
    
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});