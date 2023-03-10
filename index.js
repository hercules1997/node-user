
const express = require('express')
const uuid = require('uuid')
const cors = require("cors");
const { response, json } = require('express');

const port = process.env.PORT || 3002;
const app = express()
app.use(express.json())
app.use(cors())


const users = []


// //*?--- ROTA DE CADASTRO DE USUÁRIO ---?*//

app.post('/users', (request, response) => {

    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    if(name && age !== "") {
        users.push(user)
    }
   
    return response.status(201).json(user)

})


//*?--- ROTA DE CONSULTA DE TODOS OS PEDIDOS ---?*//

 app.get('/users', (request, response) => {
     return response.json(users)

 })


// //*?--- ROTA DE BUSCAR O PEDIDO PELO ID ---?*//

 app.get('/users/:id', (request, response) => {

     const index = request.orderIndex
     const status = users[index]

     return response.json(status)

 })


 //*?---  ROTA DE EXCLUIR O PEDIDO  ---?*//

 app.delete('/users/:id',  (request, response) => {

     const { id } = request.params
     const index = users.findIndex(req => req.id === id)

     users.splice(index, 1)
     return response.status(200), response.send({ message: "USER DELETE!" })

 })

app.listen(port, () => {
    console.log(`server 1 starded👨‍💻${port}`)
})