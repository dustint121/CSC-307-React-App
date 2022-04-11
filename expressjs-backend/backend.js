const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');

app.use(cors());

app.use(express.json());

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 


app.get('/', (req, res) => {
    res.send('Hello World!');
});


//get user by name or return list of users
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

//function to get user by name
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}



//get user by id or return list of users; return 404 if failed
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found looking for id.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


//function to get user by id
function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


//add user to table and return code 201
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = randomId();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

//function to create random id
function randomId(){
    return Math.random().toString(36).substring(4, 10);
}

//function to push new user to table
function addUser(user){
    users['users_list'].push(user);
}





//get user by name and id; or return code 204
app.get('/users/:name:job', (req, res) => {
    const name = req.params['name']; //or req.params.id
    const job = req.params['job'];
    let result = findUserByNameandJob(name, job);
    if (result === undefined || result.length == 0)
        res.status(404).send(job)//('Resource not found looking for name and job.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

//function to get user by job
const findUserByJob = (job,list) => {
    return list.filter((user) => user['job'] === job);
}
//function to get user by name and job
const findUserByNameandJob = (name, job) => {
    return findUserByJob(job, findUserByName(name));
}




//on successful delete return code 204, else return 404
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = removeUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    res.status(204).end();
});

//function to delete user by id
function removeUserById(id) {
    index = users['users_list'].indexOf(findUserById(id));
    if(index != -1)
        return users['users_list'].splice(index , 1); 
    return
}




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 