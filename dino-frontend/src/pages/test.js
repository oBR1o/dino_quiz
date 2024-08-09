// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// // import { GoogleLogin } from 'react-google-login';
// import { useAuth } from '../auth';
// import axios from 'axios';


//     let auth = useAuth();
//     let navigate = useNavigate();

//     // const responseGoogle = async (response) =>{
//     //     auth.signin(response.tokenId, (newUser) => {
//     //         console.log('login done.', newUser)
//     //         if(newUser){
//     //             if(newUser.isStaff){
//     //                 navigate('/240-124/AllResultAct', { replace: true })
//     //             }else{
//     //                 navigate('/home', { replace: true })
//     //             }
//     //         }
//     //     })
//     // }

//     const [username, setUsername] = useState() ;
//     const [password, setPassword] = useState() ;
//     const handleSubmitTwo = async () => {
//         let result = await axios.post("http://localhost:8000/authen/login/", {
//           username: username,
//           password: password,
//         });
//         console.log("login success");
//         if (result.status === 200 && result.data) {
//             let response = await axios.get('http://localhost:8000/api/whoami/', {
//                 headers: {
//                     'Authorization': `Bearer ${result.data.access}`
//                 }
//             })
//         console.log(response.data)
//         if ( response.data.is_staff === true ) {
//             console.log('Hi! Admin')
//             navigate('/240-124/AllResultAct', { replace: true })
//         }else {
//             console.log('Hi! User')
//             navigate('/home', { replace: true })
//         }
//         }
//       };

// const UsernameContext

// function Test(u, p) {

//     const uname = u
//     const pword = p

//     return (
//         {pword}, {uname},console.log(uname),console.log(pword)
//     )
// }


// export default Test;