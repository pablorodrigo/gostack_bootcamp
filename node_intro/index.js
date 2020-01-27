const express = require('express');

const server = express();

server.use(express.json());

// types
// Query params
// Route params
// Request body

// array test
const users = ['Diego', 'Claudio', 'Victor'];

// middleware global example
server.use((request, response, next) => {

    console.time('Request');

    console.log(`Method ${request.method} called`);
    console.log(`URL: ${request.url} called`);

    next();

    console.timeEnd('Request');
});

// middleware local example
function checkUserExistis(request, response, next) {
    if (!request.body.name) {
        return response.status(400).json({error: 'User not found / user name is required'});
    }

    return next();
}

// middleware local example
function checkUserInArray(request, response, next) {

    const user = users[request.params.index];

    if (!user) {
        return response.status(400).json({error: 'User does not exist'});
    }

    // changing request value to user in another route
    request.user = user;

    return next();
}

// list all uers
server.get('/users', (request, response) => {
    return response.json(users)
});

// list user by id
server.get('/users/:index', checkUserInArray, (request, response) => {

    //const {index} = request.params;
    //return response.json(users[index])

    return response.json(request.user);
});

// register new user
server.post('/users', checkUserExistis, (request, response) => {

    const {name} = request.body;

    users.push(name);

    return response.json(users)
});

// edit user
server.put('/users/:index', checkUserExistis, checkUserInArray, (request, response) => {

    const {index} = request.params;
    const {name} = request.body;

    users[index] = name;

    return response.json(users)
});

//delete user
server.delete('/users/:index', checkUserInArray, (request, response) => {
    const {index} = request.params;

    users.splice(index, 1);

    return response.send();
});

server.listen(3000);