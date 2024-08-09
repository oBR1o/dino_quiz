import './Login.css';
import Headerlr from "../components/Headerlr";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Alert, Snackbar, TextField } from '@mui/material'
// import { GoogleLogin } from 'react-google-login';
import { useAuth } from '../auth';
// import test from './test';


function Login(){

    let auth = useAuth();
    let navigate = useNavigate();

    // const responseGoogle = async (response) =>{
    //     auth.signin(response.tokenId, (newUser) => {
    //         console.log('login done.', newUser)
    //         if(newUser){
    //             if(newUser.isStaff){
    //                 navigate('/240-124/AllResultAct', { replace: true })
    //             }else{
    //                 navigate('/home', { replace: true })
    //             }
    //         }
    //     })
    // }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitTwo = async () => {
        setOpen(true);
        const user = {username: username, password: password}
        auth.signin(user, (newUser) => {
            console.log('login success', newUser)
            if(newUser){
                if(newUser.is_staff){
                    console.log('Hi! Admin');
                    navigate('/home', { replace: true });
                }else{
                    console.log('Hi! User')
                    navigate('/home', { replace: true })
                }
            }
        });
        setUsername('');
        setPassword('');
    }
        // let result = await ax.post("/authen/login/", {
        //   username: username,
        //   password: password,
        // });
        // console.log("login success");
        // console.log(auth.user);
        // if (result.status === 200 && result.data) {
        //     let response = await ax.get('api/whoami/', {
        //         headers: {
        //             'Authorization': `Bearer ${result.data.access}`
        //         }
        //     })
        // console.log(response.data)
    //     if ( response.data.is_staff === true ) {
    //         console.log('Hi! Admin')
    //         navigate('/240-124/AllResultAct', { replace: true })
    //     }else {
    //         console.log('Hi! User')
    //         navigate('/home', { replace: true })
    //     }
    //     }
    //   };

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

      return(
        <div>
            <Headerlr />
            <header>
                <div class="header-infologin">
                    <h1>เข้าสู่ระบบ</h1>
                    <TextField
                    margin="dense"
                    id="username"
                    label="ชื่อบัญชีผู้ใช้"
                    type="username"
                    variant="standard"
                    inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                    InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                    required
                    onChange={e => setUsername(e.target.value)}
                    /><br/>
                    <TextField
                    margin="dense"
                    id="password"
                    label="รหัสผ่าน"
                    type="password"
                    variant="standard"
                    inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                    InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                    required
                    onChange={e => setPassword(e.target.value)}
                    /><br/>
                    {/* <Link to="/home"> */}
                    <button type="submit" className="loginbtn" onClick={handleSubmitTwo}>เข้าสู่ระบบ</button><br/>
                    {/* </Link> */}
                    {/* <GoogleLogin
                            clientId="721256393503-d348vdjblmlubgtusfo5vafj1me8tbev.apps.googleusercontent.com"
                            buttonText="เข้าสู้ระบบด้วย Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>              */}
                    <Link to="/register">
                        <button type="register-login">สมัครสมาชิก</button>
                    </Link>
                </div>
            </header>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontFamily: 'Prompt' }}>
                    เข้าสู่ระบบไม่สำเร็จ!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;