import axios from 'axios';

export default axios.create({
  // baseURL: `https://softops-backend.herokuapp.com/mf` 
  baseURL: `http://localhost:3000/mf`  
});

// to connect to cloud, comment the localhost line above with a //  at the begining
// to connect to local/laptop, comment the heroku line above with a //  at the begining
