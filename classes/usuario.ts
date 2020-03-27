// CLASE DE "USUARIO"
// Esta es la configuración básica de un Usuario del lado del Servidor, es muy parecido a la definición que tenemos del lado del FRONTEND



//Aquí definimos una clase
export class Usuario
{
  //Podemos definir las propiedades aquí porque es un atajo que nos da TYPESCRIPT, con esto nos saltamos de golpe 3 pasos
  //que de otra formase tedrian que hacer para que funcionara de la misma manera: 1.- Definir la propiedad
  //2.- Luego tendriamos que pasarle un dato como parametro al constructor 3.- Inicializar la propiedad
  constructor
  (
    public id:          string,                 // Este es el ID del Socket que se está conectando. Siempre debe existir un campo ID    
    public nombre:      string = 'Sin-nombre',  // 'Sin-nombre'     Este campo es opcional, cuando un usuario se conecta al Servidor NO tiene nombre    
    public sala:        string = 'Sin-sala',    // 'Sin-Sala'       Digamos que es como un salón de clases, tomando la lógica de que los mensajes enviados sólo llegarán a los usuarios
                                                // que estén dentro de esa "aula"
  )
  {}
}
