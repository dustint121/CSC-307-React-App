import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);


//put initial/current backend data into frontend
  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

//get data from backend
async function fetchAll(){
  try {
     const response = await axios.get('http://localhost:5000/users');
     return response.data.users_list;     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}




//delete functions
function removeOneCharacter (index) {
  removeUser(index).then( result => {
      if (result && result.status === 204){
          const updated = characters.filter((character, i) => {
              return i !== index
          });
          setCharacters(updated);
      } 

  });
}
//synch delete
async function removeUser (index) {
  try {
      const response = await axios.delete('http://localhost:5000/users/'.concat(characters[index]['id']));
      return response;
  }
  catch (error) {
      console.log(error);
      return false;
  }
}



// update/add functions
  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 200)
        setCharacters([...characters, person] );
    });
  }
    
//synch adding person to list
  async function makePostCall(person){
    try {
        const response = await axios.post('http://localhost:5000/users', person);
        return response;
    }
    catch (error) {
        console.log(error);
        return false;
    }
  }




return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />


  </div>
)

}





export default MyApp;