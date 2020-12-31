import axios from 'axios';

// export const signUp = async (name, email, password) => {
//    try {
//       let res = await axios.post('http://thaonp.work/api/auth/signup',
//          {
//             name: name,email: email, password: password
//          }
//       )
//    }
//    catch(error){
//       console.log(error);
//    }
// }

// export const signIn = async (username, password) => {
//    var res;
//    try {
//       res = await axios.post('http://thaonp.work/api/auth/signin',
//          {
//             username: username,
//             password: password
//          }
//       )
//       console.log(res.data);
//       return res.data
//    }
//    catch(error){
//       console.log(error);
//       throw new Error("Cannot sign in", res);
//    }
// }

export const signIn = (username, password) => {
   axios.post('http://thaonp.work/api/auth/signin',
   {
      username: username,
      password: password
   }
   )
   .then(response => {return response.data})
   .catch(function (error){
      console.log(error);
   })
}