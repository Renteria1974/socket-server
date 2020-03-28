// CLASES DEL SISTEMA
import { Socket } from 'socket.io'; // Importamos la librería de "socket.io" ('Socket' es un nombre cualquiera, podemos poner el nombre que deseemos)
import socketIO from 'socket.io';   // Se importa todo el paquete


// CLASES CREADAS POR NOSOTROS
import { UsuariosLista } from '../classes/usuarios-lista';  // Importamos la clase "UsuariosLista" contenida en el archivo "usuarios-lista.ts"
import { Usuario } from '../classes/usuario';               // Importamos la clase "Usuario" contenida en el archivo "usuarios.ts"



// Constante que es una Nueva instancia de la clase "Usuarios Lista"
export const usuariosConectados = new UsuariosLista();



// Método para conectar un cliente
// "export"             = Para poder mandar llamarlo fuera de aquí
// "const"              = Lo manejamos como una constante
// "conectarCliente"    = Nombre que le damos al método
// "()=>"               = Función de flechas que recibe un objeto de tipo "Socket"
// "cliente"        = Recibimos como parámetro un objeto de tipo "Socket"
export const conectarCliente = ( cliente: Socket ) =>
{    
    // usuario      = Constante que es una nueva instancia de la clase "Usuario"
    // "cliente.id" = Es el ID que el socket le asigna al cliente, recordamos que es un ID único, irrepetible
    const usuario = new Usuario( cliente.id );

    // Agregamos al usuario a la lista de usuarios conectados
    // Mandamos llamar al método "agregar" que está dentro del archivo "usuarios-lista.ts"
    usuariosConectados.agregar( usuario );    
}



// Método para desconectar un cliente
// "export"         = Para poder mandar llamarlo fuera de aquí
// "const"          = Lo manejamos como una constante
// " desconectar"   = Nombre que le damos al método
// "()=>"           = Función de flechas que recibe un objeto de tipo "Socket"
// "cliente"        = Recibimos como parámetro un objeto de tipo "Socket"
// "io"             = Es el servidor de Sockets, es el que tiene el control y conocimiento de qué personas están conectadas
export const desconectar = ( cliente: Socket, io: socketIO.Server ) =>
{
    // Escuchamos cuando el cliente se desconecta
    cliente.on('disconnect', () =>
    {
        console.log('Cliente desconectado');    // Mandamos el mensaje de el cliente desconectado

        // "Borramos" un usuario de la lista de Conectados
        // Mandamos llamar al método "borrarUsuario" que está dentro del archivo "usuarios-lista.ts" en la aplicación de ANGULAR
        // "cliente.id" = Es el ID que el socket le asigna al cliente, recordamos que es un ID único, irrepetible
        usuariosConectados.borrarUsuario( cliente.id ); 

        // Método para emitir un mensaje
        // "'usuarios-activos'" = Es la misma propiedad que "escuchamos" en el proyecto de ANGULAR en el archivo "lista-usuarios.component.ts"
                            // en el método "obtenerUsuariosActivos"
        // Mandamos llamar al método "obtenerLista" que está dentro del archivo "usuarios-lista.ts" en la aplicación de ANGULAR
        io.emit('usuarios-activos', usuariosConectados.obtenerLista() );
    });    
}



// Método para guardar la hora y fecha de una Conexión y Desconexión
// NOTA.- Aún no sé como mandarla llamar,. quizas más adelante en el curso lo aprenda y pueda usarla
export function eventDataTime(): string
{
    return `${ new Date().toLocaleDateString() } / ${ new Date().toLocaleTimeString()} `;
}



// Método para recibir todos los eventos del SOCKET
// "cliente"    = Recibimos como parámetro un objeto de tipo "Socket"
// "io"         = Es el servidor de Sockets, es el que tiene el control y conocimiento de qué personas están conectadas
//              con él podemos enviar mensajes a todos los usuarios
export const capturaEventos = ( cliente: Socket, io: socketIO.Server) =>
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


    
    // Vamos a escuchar el llamado para configurar (Login) al Usuario
    // "'configurar-usuario'"           = Es un evento que viene de la aplicación de ANGULAR en el método "loginWebSocket" dentro del archivo "websocket.service.ts"
    // "payload: { nombre: string }"    = Función de flecha que recibe como parámetros al "payload" y al "callback"
                                        // Sabemos de que tipo es el payload porque lo craeamos en el proyecto de ANGULAR en el archivo "websocket.service.ts"
                                        // en el método "loginWebSocket"
    // "callback: Function"             = Es el valor de retorno, una función de callback
    cliente.on( 'configurar-usuario', ( payload: { nombre: string }, callback: Function ) =>
    {
        // Actualizamos el nombre del Usuario
        // "usuariosConectados" = Constante, es una Instancia de la clase "usuariosLista" (archivo "usuarios-lista.ts")
        // "actualizarNombre"   = Método para actualizar el nombre del usuario, lo definimos en el archivo "usuarios-lista.ts" en la aplicación de ANGULAR
        // "cliente.id"         = Es el ID del cliente, lo proporciona el socket, es iirepetible para cada usuario
        // "payload.nombre"     = Parámetro que recibimoscon el valor del nombre del usuario
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        // Método para emitir un mensaje
        // "'usuarios-activos'" = Es la misma propiedad que "escuchamos" en el proyecto de ANGULAR en el archivo "lista-usuarios.component.ts"
                                // en el método "obtenerUsuariosActivos"
        // Mandamos llamar al método "obtenerLista" que está dentro del archivo "usuarios-lista.ts" en la aplicación de ANGULAR
        io.emit('usuarios-activos', usuariosConectados.obtenerLista() );
        
        // Mandamos llamar al CALLBACK
        // El código ASCII de "`" es: ALT + 96
        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });



    // Vamos a escuchar el llamado para configurar (Login) al Usuario
    // "'obtener-usuarios'" = Es un evento que viene de la aplicación de ANGULAR en el método "loginWebSocket" dentro del archivo "websocket.service.ts"
    // "()                  = Función de flecha que no recibe parámetros                                                            
    cliente.on( 'obtener-usuarios', () =>
    {        
        // Método para emitir un mensaje
        // "'usuarios-activos'"                 = Es la misma propiedad que "escuchamos" en el proyecto de ANGULAR en el archivo "lista-usuarios.component.ts"
                                                // en el método "obtenerUsuariosActivos"
        // "usuariosConectados.obtenerLista()"  = Mandamos llamar al método "obtenerLista" que está dentro del archivo "usuarios-lista.ts" en la aplicación de ANGULAR
        // ".to( cliente.id )"                  = Con esto indicamos que este evento sólo va dirigido al cliente querecibimos como parámetro, si hay más cliente conectados
                                                // al socket pues a ellos lógicamente no se les envía este evento
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.obtenerLista() );        
    });
}