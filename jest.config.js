module.exports = {
  //O Bail é utilizado para que caso um teste falhe, ele vai parar os outros testes
  bail:true,

  coverageProvider: "v8",

  //testMatch iremos usar uma expressão regular para dizer qual é o padrão para os arquivos de testes
  testMatch:[
    // **/* significa que dentro de qualquer pasta vai ter um arquivo com qualquer nome que a extensão será .spec.js
    // o <rootDir> é uma espécie de variável global do jests que vai pegar a raiz do nosso projeto, eu faço isso para que a pasta node_modules seja ignorada
    "<rootDir>/src/**/*.spec.js"
  ],


}