// CLASE DE "USUARIOS-LISTA"
// La idea es que esta clase tenga centralizada la lógica de todos los usuarios: procesos para agregar, enviar mensajes en particular, etc.

import { Usuario } from './usuario';    // Importamos la clase "Usuario" del archivo "usuario.ts"



//Aquí definimos una clase
export class UsuariosLista
{
  //Podemos definir las propiedades aquí porque es un atajo que nos da TYPESCRIPT, con esto nos saltamos de golpe 3 pasos
  //que de otra formase tedrian que hacer para que funcionara de la misma manera: 1.- Definir la propiedad
  //2.- Luego tendriamos que pasarle un dato como parametro al constructor 3.- Inicializar la propiedad
  constructor
  (
    private lista: Usuario[] = []  // Este campo es de tipo USUARIO    
  )
  {}



  // Método para agregar un Usuario a la lista de "Conectados"
  // "usuario: Usuario" = Se recibe un parámetro del tipo de clase USUARIO
  public agregar(usuario: Usuario)
  {
    this.lista.push( usuario );

    console.log( this.lista );  // Mostramos la Lista completa de Usuarios conectados
    return usuario;             // Retornamos al Usuario que se acaba de agregar a la lista
  }



  //  Método que sirve para actualizar los datos de un Usuario Conectado (en este caso sólo el nombre)
  // "id"       = Es el ID del usuario al que se le desea modificar el Nombre
  // "nombre"   = Nombre que se desea actualizar
  public actualizarNombre( id: string, nombre: string )
  {
    // Hacemos un ciclo para localizar al lciente que deseamos modificar
    for ( let usuario of this.lista )
    {
        // El usuario de la lista es el mismo que el que se está recibiendo como parámetro
        if (usuario.id === id) 
        {
            usuario.nombre = nombre;
            break;  // Abortamos el ciclo FOR
        }
    }

    console.log('=== Actualizando Usuario ===');  // Mensaje que avisa lo que estamos haciendo
    console.log( this.lista );                    // Mostramos la lista de Usuarios conectados
  }



  // Método para obtener toda la lista de Usuarios conectados
  public obtenerLista()
  {
    // "usuario => usuario.nombre !== 'sin-nombre'" = Regrese los usuarios cuyo nombre sea diferente de 'sin-nombre'
    return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );  //Retornamos la lista 
  }



  // Método para obtener los datos de un Usuario conectado
  // "id" = Recibimos como parámetro el valor del ID del usuario del que deseamos ver sus datos
  public obtenerUsuario( id: string )
  {
    return this.lista.find( usuario =>
    {
      return usuario.id === id    // Retornamos al Usuario cuyo ID es igual al ID que estamos recibiendo como parámetro
    });
  }



  // Obtenemos todos los Usuarios que se encuentren en una Sala en particular
  // "sala" = Recibimos como parámetro el nombre de la sala de la cuál deseamos obtener los usuarios
  public obtenerUsuariosEnSala( sala: string )
  {
    return this.lista.filter( usuario =>
    {
      return usuario.sala === sala; // Retornamos a los usuario que se encuentran en la sala uqe se está recibiendo como argumento
    });
  }



  // Método para "borrar" un Usuario, esto sucede cuando deja el chat, deja la comunicación de sockets
  // "id" = Recibimos como parámetro el valor del ID del usuario que deseamos borrar
  public borrarUsuario( id: string )
  {
    // Creamos una constante uqe contengal os datos del usuario que vamos a "borrar"
    const usuarioTemp = this.obtenerUsuario( id ); 
    
    // A la lista de Usuarios le borramos el Usuario que seleccionamos
    this.lista = this.lista.filter( usuario =>
    {
      // Retornamos a todos los usuario cuyo ID sea diferente al que estamos señalando
      return usuario.id !== id;
    });    

    return usuarioTemp; // Retornamos el usuario que se acaba de borrar
  }
}
