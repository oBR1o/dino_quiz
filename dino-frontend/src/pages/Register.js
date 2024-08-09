import './Register.css'
import Headerlr from '../components/Headerlr'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react';
// import ax from '../config/ax'
import { useAuth } from '../auth'
import config from '../config';
import axios from 'axios';

function Register() {

    let auth = useAuth();
    let navigate = useNavigate();

    const [ firstname, setFirstname ] = useState();
    const [ lastname, setLastname ] = useState();
    const [ username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ password2, setPassword2 ] = useState();
    const [ isstaff, setIsistaff ] = useState('False');

    // if(result.is_staff === true){
    //     let teacherInfo = {first_name: firstname, last_name: lastname, email: email, password: password, password2: password2}
    //     let resultTwo = await ax.post('/api/teacher/', teacherInfo)
    // }else{
    //     let studentInfo = {first_name: firstname, last_name: lastname, email: email, password: password, password2: password2}
    //     let resultTwo = await ax.post('/api/student/', studentInfo)
    // }
    
    const registerSubmit = async () => {
        setOpen(true);
        let result = await axios.post(`${config.apiUrlPrefix}/register/`, {
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password,
            password2: password2,
            is_staff: isstaff,
        });
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
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

  return (
    <div>
        <Headerlr />
        <header>
            <div class="header-info">
                <h1>สมัครสมาชิก</h1>
            <TextField
                margin="dense"
                id="firstname"
                label="ชื่อ"
                type="text"
                variant="standard"
                inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                style={{ width: '8rem', marginRight: '0.5rem' }}
                required
                onChange={e => setFirstname(e.target.value)}
            />
            <TextField
                margin="dense"
                id="lastname"
                label="นามสกุล"
                type="text"
                variant="standard"
                inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                style={{ width: '8rem', marginLeft: '0.5rem' }}
                required
                onChange={e => setLastname(e.target.value)}
            />
            <TextField
                margin="dense"
                id="email"
                label="อีเมล"
                type="email"
                variant="standard"
                inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                style={{ width: '17rem' }}
                required
                onChange={e => setEmail(e.target.value)}
            /><br/>
            <TextField
                margin="dense"
                id="username"
                label="ชื่อบัญชีผู้ใช้"
                type="username"
                variant="standard"
                inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                style={{ width: '17rem' }}
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
                style={{ width: '17rem' }}
                required
                onChange={e => setPassword(e.target.value)}
            />
            <div className='helpertext'>*รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรและ<br/>ต้องมีสัญลักษณ์พิเศษอย่างน้อย 1 ตัว (!@#$%)*</div>
            <TextField
                margin="dense"
                id="confirm-password"
                label="ยืนยันรหัสผ่าน"
                type="password"
                variant="standard"
                inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
                style={{ width: '17rem' }}
                required
                onChange={e => setPassword2(e.target.value)}
            /><br/>
                <select id="studentorteacher" onChange={e => setIsistaff(e.target.value)}>
                    <option value ="False">นักเรียน</option>
                    <option value ="True">ครู</option>
                </select>
                <button type="register" onClick={registerSubmit}>สมัครสมาชิก</button>
                <a class="login-page" href="/login">กลับไปยังหน้าเข้าสู่ระบบ</a>
            </div>
        </header>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontFamily: 'Prompt' }}>
                สมัครสมาชิกไม่สำเร็จ!
            </Alert>
        </Snackbar>
    </div>
  )
}

export default Register