const Sequelize = require('sequelize'); //biblioteca que permite a manipulação do bd no node
//criar uma instancia no sequelize e passar os parametros: nome do bd, usuário, senha, JSON(servidor e tipo de bd)
const connection = new Sequelize('guiaperguntas','root','root',{ 
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;