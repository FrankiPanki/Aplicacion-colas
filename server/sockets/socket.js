const { io } = require('../server');
const { TicketControl } = require('./classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });



    client.on('atenderTicket', (data, callback) => {
        if (!data) {
            return callback({
                err: 'Escritorio nescesario'
            });
        }

        let atenderTicket= ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('ultimosCuatro', ticketControl.getUltimosCuatro())
        
        return callback(atenderTicket);
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('siguienteTicket', (data, callback) => {

        callback(ticketControl.siguiente());



    })


    client.on('enviarMensaje', (data, callback) => {


        console.log(data);



//===========BROADCAST===============>
//Inicialmente cuando el servidor recive informacion de un cliente todos los emmits que haga solo son enviados a ese cliente
//Al llamar al atributo broadcast lo emmits se envian a todos los clientes cono los que se haya hecho  una conexion
//En este ejemplo cada pagina en un cliente nuevo, un cliente nuevo implica llamar al metodo en el cliente io() de la libresria de sockets
//===================================>

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });



});