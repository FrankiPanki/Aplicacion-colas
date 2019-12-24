var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectado al servidor');

});
socket.on('disconnect', function () {
    console.log('Desconectado del servidor');

});

$('button').on('click', function () {
    socket.emit('siguienteTicket', {
        usuario: 'FrankiPanki',
        mensaje: 'Boradcast!'
    },function (resp) {
        label.text(resp)
    });
});

socket.on('estadoActual', function(data){
    label.text(data.actual);
})