import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from '@mui/material';
import axios from 'axios';
// import { letterSpacing } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header'
import config from '../config';
// import ax from '../config/ax';
import './Announce.css'
// import Login from './Login.js';

function Announce() {

  const location = useLocation()
  const [announce, setAnnounce] = useState([]);
  const [announceDesp, setAnnounceDesp] = useState('');
  const [editAnnounceDesp, setEditAnnounceDesp] = useState('');
  const [userRole, setUserRole] = useState(['']);
  const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchUserinfo = async () =>{
            let result = await axios.get(`${config.apiUrlPrefix}/whoami/`);
            setUserInfo(result.data)
            if(result.data.is_staff === true){
                setUserRole('คุณครู');
            }else{
                setUserRole('นักเรียน');
            }
        }
        fetchUserinfo();
    }, []);
  // const history = useHistory();
  
  // useEffect(async () => {
  //   let result = await ax.post("http://localhost:8000/authen/login/", {
  //     username: username,
  //     password: password,
  //   })
  //   setToken(result.data.acess)
  //   console.log(setToken)
  //   useEffect(async () => {
  //     let result = await ax.get('/api/announcePage/')
  //     setAnnounce(result.data.results)
  //     console.log(result.data.results)
  //   }, []);
  // })


  useEffect(() => {
    const fetchAnnounce = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/announcePage/`)
      setAnnounce(result.data.results)
    }
    fetchAnnounce();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = announce.length ? announce[announce.length - 1].id + 1 : 1;
    const newAnnounce = { ownerfirstname: userInfo.first_name, ownerlastname: userInfo.last_name, id, description: announceDesp};
    const result = await axios.post(`${config.apiUrlPrefix}/announcePage/`, newAnnounce)
    const allAnnounce = [...announce, result.data];
    setAnnounce(allAnnounce);
    setAnnounceDesp('');
    // history.push('api/');
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [fix, setFix] = React.useState(false);

  const handleClickFix = () => {
    setFix(true);
  }


  const [del, setDel] = React.useState(false);

  const handleClickDel = () => {
    setDel(true);
  }

  const handleClose = () => {
    setOpen(false);
    setFix(false);
    setDel(false);
  };

  const [keepid, setKeepid] = useState([])

  const handleEdit = async () => {
    const id = keepid
    const updatedDesp = { id, description: editAnnounceDesp };
    try {
      const response = await axios.put(`${config.apiUrlPrefix}/announcePage/${id}/`, updatedDesp);
      setAnnounce(announce.map(announce => announce.id === id ? { ...response.data } : announce));
      setEditAnnounceDesp('');
      setOpen(false);
      setFix(false);
      setDel(false);
      // history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = () => {
    const id = keepid
    axios.delete(`${config.apiUrlPrefix}/announcePage/${id}/`);
    const announceList = announce.filter(announces => announces.id !== id);
    setAnnounce(announceList);
    setOpen(false);
    setFix(false);
    setDel(false);
    // history.push('/');
  }

  // useEffect(() => {
  //   if (announce) {
  //       setEditAnnounceDesp(announce.description);
  //   }
  // }, [announce, setEditAnnounceDesp])

  return (
    <div>
      <Header />
      { userRole == "คุณครู" &&
      <div className='post-button'>
        <Button variant="outlined" sx={{ mt: '1.5rem',ml: 'auto', mr: 'auto', display: 'block', fontFamily: 'Prompt' }} onClick={handleClickOpen}><FiPlus />{' '}ประกาศข้อความ</Button>
      </div>
      }
      <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontFamily: 'Prompt' }}>ประกาศข้อความ</DialogTitle>
        <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="post"
          label="ข้อความที่ต้องการประกาศ"
          type="text"
          fullWidth
          variant="standard"
          multiline
          style={{ width: '15rem' }}
          inputProps={{style: {fontFamily: "Prompt"}}}
          InputLabelProps={{style: {fontFamily: "Prompt"}}}
          value = {announceDesp}
          onChange={(e) => setAnnounceDesp(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ยกเลิก</Button>
        <Button type="submit" onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'green' }}>ยืนยัน</Button>
        </DialogActions>
        </form>
      </Dialog>
        <div className='post-paper' style={{ margin: 'auto' }}>
        { announce.map((a)=> (
          <Paper elevation={3} sx={{ width: '100%', height:'auto', marginTop: '1.5rem' }}>
            <div className='post'>
            { userRole == "คุณครู" &&
              <div className='button'>
                <Button color='primary' size='small' sx={{ mt: '1rem', display: 'flex', fontFamily: 'Prompt' }} onClick={() => { handleClickFix(); setKeepid(a.id)}}><FiEdit />แก้ไข</Button>
                <Button color='error' size='small' sx={{ mt: '1rem', display: 'flex', fontFamily: 'Prompt' }} onClick={() => { handleClickDel(); setKeepid(a.id)}}><FiTrash />ลบ</Button>
              </div>
            }
              <h2 className='teachername'>คุณครู {a.ownerfirstname} {a.ownerlastname}</h2>
              {a.description}
            </div>
          </Paper>
          ))
        }
        </div>
        <Dialog open={fix} onClose={handleClose}>
          <form onSubmit={(e) => e.preventDefault()}>
        <DialogTitle sx={{ fontFamily: 'Prompt' }}>แก้ไขประกาศ</DialogTitle>
        <DialogContent>
        <TextField
          margin="dense"
          id="post"
          label="ข้อความที่ต้องการแก้ไข"
          type="text"
          fullWidth
          variant="standard"
          multiline
          style={{ width: '15rem' }}
          inputProps={{style: {fontFamily: "Prompt"}}}
          InputLabelProps={{style: {fontFamily: "Prompt"}}}
          value={editAnnounceDesp}
          onChange={(e) => setEditAnnounceDesp(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ยกเลิก</Button>
        <Button type="submit" onClick={handleEdit} sx={{ fontFamily: 'Prompt', color: 'green' }}>ยืนยัน</Button>
        </DialogActions>
        </form>
        </Dialog>
        <Dialog open={del} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: 'Prompt' }}>คุณต้องการลบหรือไม่ ?</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ไม่ใช่</Button>
        <Button onClick={handleDelete} sx={{ fontFamily: 'Prompt', color: 'green' }}>ใช่</Button>
        </DialogActions>
        </Dialog>
    </div>
  )
}

export default Announce