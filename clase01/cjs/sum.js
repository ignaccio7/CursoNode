
//CommonJS module export

function sum(a, b){
    return a+b;
}

//de esta manera exportamos por default la funcion y al momento de invocarla la podriamos llmar con el nombre que nosotros queramos
// module.exports = sum;
//para cambiar esto y restringir que al momento de requerir(importar) la funcion lo podemos enviar como objeto
module.exports = {sum};


