import express from "express";
import {StatusCodes } from "http-status-codes"


const app = express();
//Se proces.port nn existir, 3000 sera usado.
//Mais info: https://stackoverflow.com/questions/2802055/what-does-the-construct-x-x-y-mean
const PORT = process.env.PORT || 3000; 

//Usuarios de exemplo
let users = [
    {id: 1, name: "Gabriel Monteiro", country: "Brazil"},
    {id: 2, name: "Jorge Freitas", country: "Brazil"},
    {id: 3, name: "Alfred Wolfheart", country: "United States"}    
];

//Particularidade do EXPRESS - Definir tipo de arquivo/objeto a mandar pelo POST
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Servidor está rodando em: http://localhost:${PORT}`)
});

//#region Métodos GET

app.get("/", (request, response) =>{
    return response.send("<h1> Trabalhando com servidor Express </h1>");
});

app.get("/users", (request, response) => {
    
    return response.send(users);
});

app.get("/users/:userId", (request, response) => {
    const userId = request.params.userId;

    const user = users.find(user => {
        return (user.id == Number(userId));
    });
    return response.send(user);
}); 

//#endregion

//Métodos POST

app.post("/users", (request, response) => {
    const newUser = request.body;

    users.push(newUser);
    
    return response.status(StatusCodes.CREATED).send(newUser);
});


//Métodos PUT

app.put("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if(Number(userId) === user.id) return updatedUser;
        
        return user;
    })

    return response.send(updatedUser);

});


//Métodos DELETE

app.delete("/users/:userId", (request, response) => {
    const userId = request.params.userId;

    //update users
    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send()
})