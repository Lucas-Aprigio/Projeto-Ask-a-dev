const { raw } = require('body-parser');
const express = require('express');//Importa a biblioteca Express
const app = express();
const connection = require('./model/database');
const Pergunta = require('./model/Pergunta')
const Resposta = require('./model/Resposta')
//Conseguir manipular os parametros enviados pelo usuário.
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


//Utilizar o EJS como View Engine
app.set('view engine','ejs');
app.use(express.static('public'));//faz com que a aplicação aceite arquivos estaticos

//Database connection
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgError) => {
        console.log(msgError);
    })

//Rotas
app.get("/", (req, res) => { //criando uma rota com parametros fixos
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then((perguntas) => {   //equivalente a SELECT * FROM perguntas
        res.render("index",{perguntas:perguntas});
    }); 
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao= req.body.descricao;
    Pergunta.create({  //equivalente a INSERT INTO perguntas ... Pergunta.
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");

    });
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if (pergunta !=undefined) {
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id', 'DESC'] 
                ]
            }).then (respostas => {
                res.render("pergunta",{
                    pergunta:pergunta,
                    resposta:respostas
                });
            });
            
        }else{ 
            res.redirect("/");          
        };
    });   
});

app.post("/salvaresposta", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId,{
            resposta: corpo}
        );
    })
});

//Inicializando um servidor
app.listen(5000,()=>{console.log("App rodando!");});