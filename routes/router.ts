// **** FICHERO DE CONFIGURACIÓN DE RUTAS ****
// Aquí crearemos nuestros API REST FULL


import { Router, Request, Response } from 'express';    // Router   = Función que me permite crear objetos de tipo "Router"
import Server from '../classes/server';                 // Importamos la clase "Server" definida en el archivo "server.ts" que está dentro de la carpeta "classes"
import { usuariosConectados } from '../sockets/socket'; // Importamos la constante "usuariosCOnectados" contenida en el archivo "sockets.ts" que está dentro de la carpeta "sockets"


// Constante que vamos a ocupar para crear los Servicios REST (API ENDPOINTS)
const router = Router();


// Servicio REST para listar los mensajes Privados que ha enviado el Usuario Logueado, es un "GET", se va a consultar la BDD
// '/mensajes'              = Es el path
// (petición, respuesta)    = Es el handler, es la función que va a manejar esta petición GET
//                          y para uqe TypeScript nos ayude para la precisión de errores a la hora de escritura
//                          se definen sus tipos (Request y Response)
router.get('/mensajes', ( peticion: Request, respuesta: Response ) =>
{
    // Mandamos un mensaje de respuesta
    respuesta.json({
        ok:         true,
        mensaje:    'Todo esta Perfecto !!!'
    });
});



// Servicio REST para enviar valores por el BODY
// '/mensajes'              = Es el path
// (petición, respuesta)    = Es el handler, es la función que va a manejar esta petición GET
//                          y para uqe TypeScript nos ayude para la precisión de errores a la hora de escritura
//                          se definen sus tipos (Request y Response)
router.post('/mensajes', ( peticion: Request, respuesta: Response ) =>
{
    // Recoger los parámetros que nos llegan por la petición, que nos llegan por POST
    // .cuerpo  = Campo que viene del formulario, en el POSTMAN está definido en la columna "KEY"
    // .de      = Campo que viene del formulario, en el POSTMAN está definido en la columna "KEY"
    const cuerpo    = peticion.body.cuerpo;
    const de        = peticion.body.de;

    // Definimos el DATA del mensaje privado
    const payload =
    {
        cuerpo,
        de
    };


    // Hacemos una referencia al Servidor, creamos una constante que toma el valor de la misma instancia que tenemos corriendo en la aplicación de NODE
    const server    =  Server.instance;

    // Para mandar un mensaje a uno o todos los usuarios
    // ".io"                = Es el servidor de sockets
    // ".emit"              = Envia el mensaje
    // "mensaje-nuevo"      = Definido en la aplicación de ANGULAR dentro del archivo "chat.service.ts" en el método "obtenerMesaje"
    // "payload"            = Es la DATA, los datos que se están enviando en el mensaje
    server.io.emit( 'mensaje-nuevo', payload );


    // Mandamos un mensaje de respuesta
    respuesta.json({
        ok:         true,
        cuerpo,             // Retornamos el objeto "cuerpo"
        de                  // Retornamos el objeto "de"
    });
});



// Servicio REST para enviar valores por el BODY
// '/mensajes'              = Es el path
// (petición, respuesta)    = Es el handler, es la función que va a manejar esta petición GET
//                          y para uqe TypeScript nos ayude para la precisión de errores a la hora de escritura
//                          se definen sus tipos (Request y Response)
// "/:id" = A travez de la URL esperamos un valor de id
router.post('/mensajes/:id', ( peticion: Request, respuesta: Response ) =>
{
    const id = peticion.params.id;  //Recogemos el valor "id" del parámetro que nos llega por la URL
                                    //Si nos llegan datos por POST o GET utilizamos "body"
                                    //Si nos llegan los datos por la URL utilizamos "params"
    
    // Recoger los parámetros que nos llegan por la petición, que nos llegan por POST
    // .cuerpo  = Campo que viene del formulario, en el POSTMAN está definido en la columna "KEY"
    // .de      = Campo que viene del formulario, en el POSTMAN está definido en la columna "KEY"
    const cuerpo    = peticion.body.cuerpo;
    const de        = peticion.body.de;


    // Definimos el DATA del mensaje privado
    const payload =
    {
        de,
        cuerpo
    };

    // Hacemos una referencia al Servidor, creamos una constante que toma el valor de la misma instancia que tenemos corriendo en la aplicación de NODE
    const server    =  Server.instance;

    // para mandar un mensaje a uno o todos los usuarios
    // ".io"                = Es el servidor de sockets
    // ".in"                = Manda un mensaje a un usuario que se encuentre en un canal particular
    // "id"                 = Es el ID del usuario, el que se recibe por la URL
    // ".emit"              = Envia el mensaje
    // "mensaje-privado"    = Definido en la aplicación de ANGULAR dentro del archivo "chat.service.ts" en el método "obtenerMesajesPrivados"
    // "payload"            = Es la DATA, los datos que se están enviando en el mensaje
    server.io.in( id ).emit( 'mensaje-privado', payload );


    // Mandamos un mensaje de respuesta
    respuesta.json({
        ok:     true,
        cuerpo,             // Retornamos el objeto "cuerpo"
        de,                 // Retornamos el objeto "de"
        id                  // Retornamos el objeto "id" que nos llega por la URL
    });
});



// Servicio REST para obtener todos los IDs de los usuarios
// '/usuarios'              = Es el path
// (petición, respuesta)    = Es el handler, es la función que va a manejar esta petición GET
//                          y para uqe TypeScript nos ayude para la precisión de errores a la hora de escritura
//                          se definen sus tipos (Request y Response)
router.get('/usuarios', ( peticion: Request, respuesta: Response ) =>
{
    // Hacemos una referencia al Servidor, creamos una constante que toma el valor de la misma instancia que tenemos corriendo en la aplicación de NODE
    const server    =  Server.instance;

    // Obtenemos los IDs de los sockets ("barrer" todos los clientes conectados)
    // ".io"                = Es el servidor de sockets
    // ".clients"           = Hace un barrido de todos los clientes conectados, regresa un callback
    // "error:any"          = Argumento que es un error en caso de que suceda uno
    // "clientes: string[]" = Argumento que es un arreglo de tipo "string
    server.io.clients( ( error:any, clientes: string[] ) =>
    {
        // En caso de presentarse un error
        if ( error )
        {
            // "return" = Al presentarse el error abortamos la ejecución de este servicio
            // "Imprimimos" el error
            return respuesta.json({
                ok: false,
                error
            })
        }

        // Todo OK
        respuesta.json({
            ok: true,
            clientes    // Retornamos el listado de clientes conectados
        });
    });

});



// Servicio REST para obtener todos los Usuarios y sus Nombres
// '/mensajes/respuesta'    = Es el path
// (petición, respuesta)    = Es el handler, es la función que va a manejar esta petición GET
//                          y para uqe TypeScript nos ayude para la precisión de errores a la hora de escritura
//                          se definen sus tipos (Request y Response)
router.get('/usuarios/detalle', ( peticion: Request, respuesta: Response ) =>
{
    // "usuariosConectados" = Es la constante de tipo "UsuariosLista (Socket)"

    // Todo OK
    respuesta.json({
        ok: true,
        clientes: usuariosConectados.obtenerLista()    // Retornamos el listado de clientes conectados
    });

});





// Indicamos que la constante "router" es el elemento por default que se exportará
export default router;