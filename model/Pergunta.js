const Sequelize = require('sequelize');
const connection = require("./database")


const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull: false
    }
});

//função que sincroniza o código com o bd. (force) é para sobrescrever caso já exista uma table com o mesmo nome
Pergunta.sync({force:false}).then(() => {})
module.exports = Pergunta;
