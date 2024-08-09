import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "./config";

// const fetchStudent = async () => {
//   let result = await ax.get('/api/student/')
//   let studentList = result.data.results
//   console.log(studentList)
//   return studentList
// }

const fetchTeacher = async () => {
  let result = await axios.get(`${config.apiUrlPrefix}/teacher/`)
  return result.data.results
}

function TeacherUserExists(username) {
  let arr = fetchTeacher()
  return arr.some(function(el) {
    return el.username === username;
  })
}

const appAuthProvider = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    async signin(user, callback) {
        appAuthProvider.isAuthenticated = true;
        // setTimeout(callback, 100); // fake async
        let result = await axios.post(`${config.apiUrlPrefix}/login/`, user)
      if(result.status === 200 && result.data){
          appAuthProvider.accessToken = result.data.access
          appAuthProvider.refreshToken = result.data.refresh
          let user_result = await axios.get(`${config.apiUrlPrefix}/whoami/`)
          let userInfo = user_result.data
          let student_result = await axios.get(`${config.apiUrlPrefix}/student/`) 
          let studentList = student_result.data.results
          // if(userInfo.is_superuser === false){
          //   if(userInfo.is_staff === true){
          //     if(TeacherUserExists(userInfo.username) === false){
          //       let savedInfo = {username: userInfo.username, first_name: userInfo.first_name, last_name: userInfo.last_name, email: userInfo.email,
          //                         password: userInfo.password, password2: userInfo.password2}
          //       let saveUser = await ax.post('/api/teacher/', savedInfo)
          //     }
          //   }else{
          //     studentList.map ((s) => {
          //       if(s.username === userInfo.usename){
          //         console.log("Already have this username.")
          //       }
          //     })
          //     let savedInfo = {username: userInfo.username, first_name: userInfo.first_name, last_name: userInfo.last_name, email: userInfo.email,
          //                         password: userInfo.password, password2: userInfo.password2}
          //     let saveUser = await ax.post('/api/student/', savedInfo)
          //   }
          // }
          callback(user_result.data)

      }else{
          callback(null)
      }
    },
    signout(callback) {
        appAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

axios.interceptors.request.use(config => {
  if(appAuthProvider.accessToken){
    config.headers.authorization = `Bearer ${appAuthProvider.accessToken}`
  }
  return config;
});

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {

  let [user, setUser] = React.useState(null);

  let signin = (token, callback) => {
    return appAuthProvider.signin(token, (newUser) => {
      setUser(newUser);
      callback(newUser);
    });
  };

  let signout = (callback) => {
    return appAuthProvider.signout(() => {
      setUser(null);
      // callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthGuard({ children }){
  let auth = useAuth()
  let navigate = useNavigate()
  useEffect(() => {
    if(!auth.user){
      navigate('/login', {replace : true})
    }
  })
  return children
}

export { appAuthProvider, AuthContext, AuthProvider, useAuth, AuthGuard};