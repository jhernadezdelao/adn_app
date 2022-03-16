# adn_app
adn app  verify mutation in ADN

npm run dev 
    to run  app on dev env
npm test 
    to test
npm run build 
    to build app
npm start 
    to run compiled app

 en el archivo .env deje la url  de conexion a la base de datos, 
 la deje expuesta ahi para que sea mas facil usar, la borrare el fin de semana

 para poder correr las apis necesitas un token que debes enviar en el header  x-access-token

 para generar el token usa la api
 http://localhost:3000/api/auth/signin
 {
    "email":"admin@localhost",
    "password":"admin"
}

 para verificar una cadena de adn usa la Api 
 http://localhost:3000/api/adn/mutation

 para otener el conteo de las mutaciones y no mutaciones usa la Api
 http://localhost:3000/api/adn/getAdn

 para dar de alta un usaurio usa la APi
 http://localhost:3000/api/auth/signup
 los roles pueden ser admin o user
  
  a continuacion ejemplo de las apis con postman

https://documenter.getpostman.com/view/156017/UVsLSmKU
