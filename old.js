//importamos una libreria y la guardamos en la variable http
const http = require('http'); //ES5

// Para usarlo de esta forma hay que cambiar configuraciones
// import http from 'http'; ES6

//Creamos un servidor
//req es request (pregunta)
//res es response (respuesta)
const server = http.createServer(function (req,res){
        console.log('Request received');
        //console.log(req);
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end(greet(' Sergio'));
    }
);


//Lo pusimos a escuchar
server.listen(3000, () => {
    console.log('Listening on port 3000');
})  
/*
//normal function 
function greet(){
    return 'Hello world from Greet Method';
}
*/

/* Arrow function from greet v1
const greet = () => {
    return 'Hello world from Greet arrow Method';
}*/

//Arrow function v2, Si lo unico que hace mi funcion es retornar,puedo omitir las llaves 
//y el return
//const greet = (name) => 'Hello world from Greet arrow Method v2 made by '+ name;

//Arrow function v3, si solo recibe un parametro se pueden omitir los parentesis
const greet = name => 'Hello world from Greet arrow Method v3 made by '+ name;
