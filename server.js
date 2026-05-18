// Projeto básico de rotas - backend com node js

const express = require("express");
const app = express();
app.use(express.json());

// banco de dados fake

let usuarios = [
    {id: 1, nome: "João", email:"joao@gmail.com"},
    {id: 2, nome: "Maria", email:"maria@gmail.com"},
    {id: 2, nome: "Carlinhos", email:"carlinhos@gmail.com"},
];

// get - Pag inicial
app.get("/", (req, res) =>{
    res.send("Servidor funcionando com sucesso!");
});

// get - Lista de usuários
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// get com parâmetro ("filtro")
app.get("usuario/:id", (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if(!usuario){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
    res.json(usuario);
});

// post - cadastrar usuário
app.post("/cadastro", (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).json({
            mensagem: "Nome e email são obrigatórios"
        });
    }
    const novoUsuario = {
        id:usuarios.lenght + 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Cadastro realizado com sucesso!",
        usuarios: novoUsuario
    });
});

// Put - editar usuário
app.put("/editar/:id", (res, req) => {
    const id = Number(req.params.id);
    const {nome, email} = req.body;
    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
    res.json({
        mensagem: "Usuário atualizado com sucesso!",
        usuario
    });
});

// Delete - deletar usuário

app.delete("deletar/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if(index === -1){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
    
    if(nome) usuario.nome = nome;
    if(email) usuario.email = email;

    res.json({
        mensagem: "Usuário atualizado com sucesso!"
    });

    const usuarioRemovido = usuarios.splice(index, 1);

    res.json({
        mensagem: usuarioRemovido[0]
    });
});

// Servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http.localhost:${PORT}`);
});
