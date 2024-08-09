import React, { useEffect, useState } from 'react'
import './Profile.css'
import HomeHeader from '../components/HomeHeader'
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import ax from '../config/ax';
import { useAuth } from '../auth';
import axios from 'axios';
import config from '../config';

function Profile() {

  let auth = useAuth();
  let navigate = useNavigate();
  
  const [firstNameUpdate, setFirstNameUpdate] = useState('');
  const [lastNameUpdate, setLastNameUpdate] = useState('');
  const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchUserinfo = async () =>{
            let result = await axios.get(`${config.apiUrlPrefix}/whoami/`);
            setUserInfo(result.data);
        }
        fetchUserinfo();
    }, []);

  const handleEdit = async () => {
    let id = auth.user.id
    try {
      const response = await axios.put(`${config.apiUrlPrefix}/update_profile/${id}/`, {
        first_name: firstNameUpdate,
        last_name: lastNameUpdate,
      });
      // let resultChange = [...userInfo, response.data]
      // setUserInfo(resultChange)
      setFirstNameUpdate('');
      setLastNameUpdate('');
      let result = await axios.get(`${config.apiUrlPrefix}/whoami/`)
      setUserInfo(result.data)
      navigate('/home', { replace: true });
      // history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  

  return (
    <div>
        <HomeHeader userInfo={userInfo} />
        <section>
          สวัสดี, {userInfo.first_name} {userInfo.last_name} <br/> นี่คือโปรไฟล์ของคุณ
        </section>
        <header>
        <form class="headerProfile" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h1>แก้ไขโปรไฟล์</h1>
              <TextField
              margin="dense"
              id="newfirstname"
              label="ชื่อใหม่"
              type="text"
              variant="standard"
              inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              value={firstNameUpdate}
              onChange={(e) => setFirstNameUpdate(e.target.value)}
              /><br/>
              <TextField
              margin="dense"
              id="newlastname"
              label="นามสกุลใหม่"
              type="text"
              variant="standard"
              inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              value={lastNameUpdate}
              onChange={(e) => setLastNameUpdate(e.target.value)}
              /><br/>
              {/* <TextField
              margin="dense"
              id="password"
              label="รหัสผ่าน"
              type="password"
              variant="standard"
              inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              /><br/> */}
              <button class="profileagree" type="submit" onClick={handleEdit}>ยืนยันการแก้ไขโปรไฟล์</button><br/>
          </div>
          </form>
          {/* <div class="headerProfile">
            <h1>แก้ไขรหัสผ่าน</h1>
              <TextField
              margin="dense"
              id="editpassword"
              label="รหัสผ่านปัจจุบัน"
              type="password"
              variant="standard"
              inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              /><br/>
              <TextField
              margin="dense"
              id="newpassword"
              label="รหัสผ่านใหม่"
              type="password"
              variant="standard"
              inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              /><br/>
              <TextField
              margin="dense"
              id="comfirmnewpassword"
              label="ยืนยันรหัสผ่านใหม่"
              type="password"
              variant="standard"
              inputProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              InputLabelProps={{style: { fontFamily: "Prompt", color: 'black' }}}
              /><br/>
              <Link to="/profile">
                <button class="passwordagree" type="submit" onClick="refresh">ยืนยันการแก้ไขรหัสผ่าน</button><br/>
              </Link>
          </div> */}
        </header>
    </div>
  )
}

export default Profile;