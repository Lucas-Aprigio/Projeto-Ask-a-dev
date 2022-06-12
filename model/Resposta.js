const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require("./database")

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowEmpty: false },
    
    perguntaId: {
        type: Sequelize.INTEGER,
        allowEmpty: false
    }
});

Resposta.sync({force: false}).then(() => {})
module.exports = Resposta;