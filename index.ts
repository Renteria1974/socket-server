// **** ARCHIVO PRINCIPAL DE LA APLICACIÓN, CON LA QUE ARRANCA ****


// Cargamos el módulo "express", nos va a permitir trabajar con las rutas, protocolo HTTP, etc.
import express from 'express';

// Importammos la clase "Server" que creamos en el archivo "server.ts" dentro de la carpeta "classes"
// Se importa de esta manera (sin los "{}") ya que definimos a la clase "server" con "export default"
import Server from './classes/server';

// Importamos la constante "router" que creamos en el archivo "router.ts" que está dentro de la carpeta "routes"
//  No usamos los "{}" porque esta constante la manejamos como "export default", es decir, que es el único elemento
//  del archivo "routes.ts" que se exporta
import router from './routes/router';

// Importamos la librería de CORS
import cors from 'cors';



// Constante del tipo "Servidor"
const server = Server.instance;



//-- MIDDLEWARE DE EXPRESS
// Son funciones, métodos que se ejecutan en primer lugar cuando se ejecutan peticiones HTTP, antes de que llegue a un controlador)
server.app.use( express.urlencoded({extended:false}) );  //Creamos el middleware
server.app.use( express.json() );                        //Lo que traiga el body (viene por el POST) lo convertimos
                                                         // a JSON (genera un objeto de JavaScript) para poder usarlo dentro de nuestro código



//-- CONFIGURAR CABECERAS Y CORS -- (Para cualquier proyecto aplican las siguientes instrucciones, son las mismas)
// Creamos el Middleware para el CORS, es el acceso cruzado entre dominios, se configuran una serie de
// cabeceras para permitir peticiones AJAX de un dominio a otro, desde nuestro cliente hasta nuestra API
// Así nos evitamos problemas a la hora de hacer peticiones AJAX desde JavaScript, un FrontEnd, Etc.
server.app.use( cors({ origin: true, credentials: true }) );



//-- RUTAS DE SERVICIOS
// Aquí cargamos la configuración de rutas
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
// "app.use" = Nos permite hacer middleware, es decir, en cada petción que se haga el middleware siempre se va a ejecutar antes de llegar a la acción del controlador
server.app.use('/',router);


// Probamos que el Servidor está corriendo
// server.start = Mandamos llamar al método "start" que definimos en la clase "Server" que está en el
//              archivo "server.ts" dentro de la carpeta "classes"
server.start(()=>
{
    // server.port  = Numero de puerto, variable especificada en la clase "Server" definida en el archivo "server.ts"
    //              que está dentro de la carpeta "classes"
    console.log(`El Servidor Node está corriendo en el Puerto ${ server.port } `);
});