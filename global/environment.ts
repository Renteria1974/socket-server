// **** DEFINIMOS LAS CONSTANTES O VARIABLES QUE SERAN GLOBALES A TODA LA APLICACIÓN ****



// Puerto en el que correrá la aplicación. Nota: No usar el 4200 porque la aplicación de Angular corre por default en ese
// Number()         = Para obligar a que siempre sea un número ya que typescript toma el valor "preocess.env.PORT" como un string
// process.env.PORT = Por si desplegamos esta aplicación en un Servidor HEROKU al puerto se le da el valor que arroja esta variable
export const SERVER_PORT: number =  Number( process.env.PORT ) || 5000;