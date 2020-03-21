// Importamos la librería de "socket.io" ('Socket' es un nombre cualquiera, podemos poner el nombre que deseemos)
import { Socket } from 'socket.io';
// Se importa todo el paquete
import socketIO from 'socket.io';




// Método para desconectar un cliente
// "export"         = Para poder mandar llamarlo fuera de aquí
// "const"          = Lo manejamos como una constante
// " desconectar"   = Nombre que le damos al método
// "()=>"           = Función de flechas que recibe un objeto de tipo "Socket"
export const desconectar = ( cliente: Socket ) =>
{
    // Escuchamos cuando el cliente se desconecta
    cliente.on('disconnect', () =>
    {
        console.log('Cliente desconectado');
    });
}



// Método para guardar la hora y fecha de una Conexión y Desconexión
// NOTA.- Aún no sé como mandarla llamar,. quizas más adelante en el curso lo parenda y pueda usarla
export function eventDataTime(): string 
{
    return `${ new Date().toLocaleDateString() } / ${ new Date().toLocaleTimeString()} `;
}



// Método para "escuchar" mensajes
// "cliente"    = Recibimos como parámetro un objeto de tipo "Socket"
// "io"         = Es el servidor de Sockets, es el que tiene el control y conocimiento de qué personas están conectadas
//              con él podemos enviar mensajes a todos los usuarios
export const mensaje = ( cliente: Socket, io: socketIO.Server) =>
{
    // Vamos a escuchar el mensaje que "cliente" va a emitir
    // "'mensaje'"                  = Mensaje que se va a emitir
    // "( payload,callback ) =>"    = Función de flecha que recibe como parámetros al "pauload" y al "callback"
                                      // Sabemos de que tipo es el payload porque lo craeamos en el proyecto de ANGULAR en el archivo "websocket.service.ts"
                                      // en el métido "enviarMensaje"
    cliente.on( 'mensaje', ( payload: { de: string, cuerpo: string } ) =>
    {
        // Manejador de lo que sea que se recibe con el mensaje
        console.log('Mensaje Recibido',payload);


        // Método para emitir un mensaje
        // "'mensaje-nuevo'" = Es la misma propiedad que "escuchamos" en el proyecto de ANGULAR en el archivo "chat.component.ts" 
                        // en el método "obtenerMensaje"
        io.emit('mensaje-nuevo', payload );
    });    
}