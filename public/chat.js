const socket = io.connect('http://localhost:4396');

//query DOM

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//emit events 
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

//listen for events
socket.on('chat', (data) => {
    feedback.innerHTML ='';
    output.innerHTML += '<p><strong>' + data.handle + ': ' + '</strong>' + data.message +'</p>';
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing...' + "</em></p>";
})