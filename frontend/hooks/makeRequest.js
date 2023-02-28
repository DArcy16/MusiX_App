const { default: axios } = require("axios");

 
 const makeRequest = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
     Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
   },
 });

 export default makeRequest;