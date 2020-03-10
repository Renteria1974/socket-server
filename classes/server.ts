// **** ESTA CLASE ES PARA DEFINIR Y "LEVANTAR" EL SERVIDOR DE NODE **** //
// Creamos un Servidor WEB con "EXPRESS" dentro de "TS", esto va a ser el motor de la Aplicación WEB, se va a encargar de recibir peticiones HTTP,
// de crear controladores, de tener disponibles rutas, Etc... todo esto para poder construir el servidio RESTFULL de la mejor manera posible a nivel
// de BackEnd.


// Cargamos el módulo "express", nos va a permitir trabajar con las rutas, protocolo HTTP, etc.
import express from 'express';

// Importammos la constante global "SERVER_PORT" que creamos en el archivo "enviroment.ts" dentro de la carpeta "global"
import { SERVER_PORT } from '../global/environment';


// Aquí definimos una clase
// export   = Se va a exportar para ocuparla en otro lugar
// default  = Indica que esta clase es lo único que se va a exportar en este archivo
export default class Server
{
    public app:     express.Application;   // Es del tipo de la aplicación de Express
    public port:    number;                // Puerto donde se va a estar corriendo la aplicación


    //CONSTRUCTOR : Es el primer método que se lanza al instanciar un objeto o instanciar la clase. Al llamar al componente lo primero en ejecutarse es el Constructor.
    //              Se utiliza para inicializar las propiedades de la clase, asignarles un valor o hacer una pequeña configuración
    constructor()
    {
        this.app    = express();    // Indicamos que la variable "app" es del tipo "express"
        this.port   = SERVER_PORT;  // Es la constante que definimos en el archivo "environments.ts" que está dentro de la carpeta "classes"
    }


    // Método para "levantar el Servidor"
    // callback: any    = Se recibe un "callback" de tipo "any", es decir, de tipo indefinido, en el curso
    //                  Fernando lo pone del tipo "Function" pero a mí me da error
    start( callback: any )
    {
        // this.app.listen  = Método para indicar que el servidir va a estar escuchando
        // this.port        = Puerto en el que el Servidor va a estar "escuchando"
        // callback         = Se llama a esta función una vez que el servidor ya esté escuchando
        this.app.listen( this.port, callback );
    }

}