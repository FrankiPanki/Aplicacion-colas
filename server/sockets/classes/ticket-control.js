const path = require('path')
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        let data = require('../data/data.json');
        
        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
            
        }
    }
    
    reiniciarConteo() {
        this.tickets = []
        this.ultimo = 0;
        this.ultimosCuatro = [];
        console.log('Se ha reiniciliazado del archivo');
        this.grabarArchivo();
    }


    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }


        let jsonDataString = JSON.stringify(jsonData);

        let pathUrl = path.resolve(__dirname, '../data/data.json')
        fs.writeFileSync(pathUrl, jsonDataString);

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atender = new Ticket(numeroTicket, escritorio);
        this.ultimosCuatro.unshift(atender);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1,1); //borra ultimo elemento
        }

        console.log('ultmos 4', this.ultimosCuatro);
        this.grabarArchivo();

        return atender;
    }

}






module.exports = {
    TicketControl
}