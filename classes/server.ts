// **** ESTA CLASE ES PARA DEFINIR Y "LEVANTAR" EL SERVIDOR DE NODE **** //
// Creamos un Servidor WEB con "EXPRESS" dentro de "TS", esto va a ser el motor de la Aplicación WEB, se va a encargar de recibir peticiones HTTP,
// de crear controladores, de tener disponibles rutas, Etc... todo esto para poder construir el servidio RESTFULL de la mejor manera posible a nivel
// de BackEnd.


// Cargamos el módulo "express", nos va a permitir trabajar con las rutas, protocolo HTTP, etc.
import express from 'express';

// Importamos la constante global "SERVER_PORT" que creamos en el archivo "enviroment.ts" dentro de la carpeta "global"
import { SERVER_PORT } from '../global/environment';

// Importamos la librería de "socket.io" ('socketIO' es un nombre cualquiera, podemos poner el nombre que deseemos)
import socketIO from 'socket.io';

// Es el intermediario entre EXPRESS y SOCKETIO
// Lo que sucede es que EXPRESS "levanta" un servidor HTTP
import http from 'http';

// Importamos todos lo que se encuentre en el archivo archivo "socket.ts" que se localiza edentro del a carpeta "sockets"
// "as socket"  = 
import * as socket from '../sockets/socket';



// Aquí definimos una clase
// export   = Se va a exportar para ocuparla en otro lugar
// default  = Indica que esta clase es lo único que se va a exportar en este archivo
export default class Server
{
    private static _instance: Server;           // Propiedad estática del tipo de la clase

    public app:         express.Application;    // Es del tipo de la aplicación de Express
    public port:        number;                 // Puerto donde se va a estar corriendo la aplicación

    public io:          socketIO.Server;        // Variable de tipo socket.io , es la propiedad encargada de emitir eventos
                                                // y escuchar otras cosas
    private httpServer: http.Server;            // Esta propiedad sólo va a ser válida dentro de esta clase
                                                // En teoría este servidor es el que se va a levantar y no el "app"


    //CONSTRUCTOR : Es el primer método que se lanza al instanciar un objeto o instanciar la clase. Al llamar al componente lo primero en ejecutarse es el Constructor.
    //              Se utiliza para inicializar las propiedades de la clase, asignarles un valor o hacer una pequeña configuración
    private constructor()
    {
        this.app    = express();    // Indicamos que la variable "app" es del tipo "express"
        this.port   = SERVER_PORT;  // Es la constante que definimos en el archivo "environments.ts" que está dentro de la carpeta "classes"

        // Socket.io necesita recibir la configuración del servidor que está corriendo en este momento
        // pero como EXPRESS y SOCKETIO no son compatibles se requiere de un intermediario: HTTP
        // "this.app" = Mandamos la configuración que tiene la "app" de EXPRESS
        this.httpServer = new http.Server( this.app );

        // Esta es la parte más importante de la configuración de los sockets: configurar el "io"
        // El "io" recibe la configuración del HTTPSERVER
        this.io =  socketIO( this.httpServer );

        // Llamamos al método que "escucha" sockets
        this.escucharSockets();
    }



    // Metodo para obtener la instancia actual de la clase "server"
    public static get instance()
    {
        // Retorna la instancia actual de la clase "server" y en caso de no existir crea una
        return this._instance || ( this._instance = new this() );
    }



    // Método para "escuchar" sockets, es privado porque sólo va a ser llamado desde la inicialización de la clase
    // Es decir, aquí el servidor (NODE) "escucha" los mensajes que el "cliente" (ANGULAR) emite
    private escucharSockets()
    {
        console.log('Escuchando Conexiones - Sockets');

        // Escuchamos un evento
        // "cliente" = Objeto de tipo Socket que se retorna
        this.io.on('connection', cliente =>
        {            
            // Mostramos el ID del cliente (lo genera el socket, son ID únicos), incluso si se recarga la página dle navegador vuelve a generar otro ID
            // console.log( cliente.id );

            // **** Para agregar al usuario a la lista de clientes conectados ****
            // "cliente"    = Es un objeto de tipo Socket            
            socket.conectarCliente( cliente );

            // **** Para que esté al pendiente de todos los eventos del SOCKET ****
            // "cliente"    = Es un objeto de tipo Socket
            // "this.io"    = Mandamos como referencia el Servidor de Sockets
            socket.capturaEventos( cliente, this.io );

            // **** Desconectar al cliente ****
            // "cliente" = Es el mismo que indicamos arriba en la conexión
            // "this.io"    = Mandamos como referencia el Servidor de Sockets
            socket.desconectar( cliente, this.io );            
        });
    }



    // Método para "levantar el Servidor"
    // callback: any    = Se recibe un "callback" de tipo "any", es decir, de tipo indefinido, en el curso
    //                  Fernando lo pone del tipo "Function" pero a mí me da error
    start( callback: any )
    {
        // this.httpServer.listen   = Método para indicar que el servidir va a estar escuchando
                                    // Se utiliza "httpSever" en lugar de "app" para que se reconozca el "socket.io"
        // this.port                = Puerto en el que el Servidor va a estar "escuchando"
        // callback                 = Se llama a esta función una vez que el servidor ya esté escuchando
        this.httpServer.listen( this.port, callback );
    }

}