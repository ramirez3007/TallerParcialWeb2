const fs = require('fs');

function  leerArchivo(path) {
    const data = fs.readFileSync(path);
    const todos = JSON.parse(data).todos;
    return todos;
}

function escribirArchivo (path, info){
    const data = JSON.stringify({'todos': info});
    fs.writeFileSync(path,data);
}

module.exports = {
    leerArchivo,
    escribirArchivo
}
