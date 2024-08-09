import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { useEffect, useState } from 'react'
import { FiPlus, FiTrash } from 'react-icons/fi';
import { RiCalendarCheckFill } from "react-icons/ri";
import Header from '../components/Header'
import './Activity.css'
import { th } from 'date-fns/locale';
import dinoegg from '../imgfile/dinoegg.png'
// import ax from '../config/ax';
import { format } from 'date-fns';
import axios from 'axios';
import config from '../config';

const count = 0

function Activity() {

  const [activity, setActivity] = useState([]);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDueTime, setActivityDueTime] = useState(new Date());

  const [keepid, setKeepid] = useState([])

  const [userRole, setUserRole] = useState(['']);

    useEffect(() => {
        const fetchUserinfo = async () =>{
            let result = await axios.get(`${config.apiUrlPrefix}/whoami/`);
            if(result.data.is_staff === true){
                setUserRole('คุณครู');
            }else{
                setUserRole('นักเรียน');
            }
        }
        fetchUserinfo();
    }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/activityPage/`)
      setActivity(result.data.results)
    }
    fetchActivity();
  }, []);

  const handleDoAct = async () => {
    const id = keepid
    const response = await axios.post(`${config.apiUrlPrefix}/user_done_activity/${id}/`)
    setActivity(activity.map(activity => activity.id === id ? { ...response.data } : activity));
    setQuizw(false);
    let result = await axios.get(`${config.apiUrlPrefix}/activityPage/`)
    setActivity(result.data.results)
  }

  // useEffect(async () => {
  //   let result = await ax.get('/api/activityPage/')
  //   setActivity(result.data.results)
  //   console.log(result.data.results)
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = activity.length ? activity[activity.length - 1].id + 1 : 1;
    const due_time = format(new Date(), 'yyyy-MM-dd hh:mm:ss')
    // const activity_title = "เก็บไข่ไดโนเสาร์"
    const newActivity = {id, due_time, title: activityTitle};
    console.log(newActivity)
    const result = await axios.post(`${config.apiUrlPrefix}/activityPage/`, newActivity)
    const allactivity = [...activity, result.data];
    console.log(allactivity)
    setActivity(allactivity);
    setActivityTitle('');
    // setActivityDueTime(new Date());
    // history.push('api/');
  }

  const handleDelete = async () => {
    const id = keepid
    await axios.delete(`${config.apiUrlPrefix}/activityPage/${id}/`);
    const activityList = activity.filter(activity => activity.id !== id);
    setActivity(activityList);
    setOpen(false);
    setQuizw(false);
    setDel(false);
    // history.push('/');
  }

  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuizw(false);
    setDel(false);
  };
  const [quizw, setQuizw] = React.useState(false);

  const handleClickQuizw = () => {
    setQuizw(true);
  };
  const [del, setDel] = React.useState(false);

  const handleClickDel = () => {
    setDel(true);
  };

  // const [value, setValue] = React.useState(new Date());

  const [event, setEvent] = React.useState('');

  const handleChange = (event) => {
    setEvent(event.target.value);
  };

  const [lvl, setLvl] = React.useState(0);

  const btndisable = () => {
    setQuizw(false);
    setLvl(1);
  }

  

  return (
    <div>
      <Header />
      { userRole == "คุณครู" &&
      <div className='post-button'>
        <Button variant="outlined" sx={{ mt: '1.5rem',ml: 'auto', mr: 'auto', display: 'block', fontFamily: 'Prompt' }} onClick={handleClickOpen}><FiPlus />{' '}กิจกรรม</Button>
      </div>
      }
      <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontFamily: 'Prompt' }}>กิจกรรม</DialogTitle>
          <DialogContent sx={{ width: '20rem', height: '18rem' }}>
          <TextField
            margin="dense"
            id="eventname"
            label="ชื่อกิจกรรม"
            type="text"
            fullWidth
            variant="standard"
            multiline
            style={{ width: '15rem' }}
            inputProps={{style: {fontFamily: "Prompt"}}}
            InputLabelProps={{style: {fontFamily: "Prompt"}}}
            required
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
          />
          <FormHelperText sx={{ fontFamily: "Prompt" }}>*จำเป็น</FormHelperText><p/>
          <FormControl required sx={{ minWidth: '15rem' }}>
            <InputLabel id="selectquestion" sx={{ fontFamily: "Prompt" }}>เลือกโจทย์ที่ต้องการ</InputLabel>
            <Select
              labelId="selectquestion"
              id="selectquestion"
              value={event}
              label="เลือกโจทย์ที่ต้องการ *"
              onChange={handleChange}
              sx={{ fontFamily: "Prompt" }}
              required
            >
              <MenuItem value="" sx={{ fontFamily: "Prompt" }}>
                None
              </MenuItem>
              <MenuItem value={1} sx={{ fontFamily: "Prompt" }}>เก็บไข่ไดโนเสาร์</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText sx={{ fontFamily: "Prompt" }}>*จำเป็น</FormHelperText><p/>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={th}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} />}
              label="กำหนดส่ง"
              value={activityDueTime}
              onChange={(e) => {
                setActivityDueTime(e);
              }}
              minDateTime={new Date()}
              inputProps={{style: {fontFamily: "Prompt"}}}
              InputLabelProps={{style: {fontFamily: "Prompt"}}}
            />
            <FormHelperText sx={{ fontFamily: "Prompt" }}>*จำเป็น</FormHelperText>
            </LocalizationProvider>
          </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ยกเลิก</Button>
              <Button type="submit" onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'green',}}>ยืนยัน</Button>
            </DialogActions>
            </form> 
        </Dialog>

        { activity.map((a) => (
        <div className='post-paper-act' style={{ margin:'auto' }}>
          <Paper elevation={2} sx={{ width: '100%', mt:'1rem', pt: '2rem', pb: '2rem' }}>
            <div className='buttoneq'>
              <Button disabled={a.activity_status !== false} id="quiz" variant="contained" size='medium' color= 'primary' onClick={ () => { handleClickQuizw(); setKeepid(a.id)}} sx={{ width: '100%', m:'auto', fontFamily: 'Prompt', fontWeight: 'bold' }}>
                <RiCalendarCheckFill size={28} style={{ marginRight: '0.5rem' }} />กิจกรรม<br/>{a.title}
              </Button>
              { userRole == "คุณครู" &&
              <div className='expdate'>
                กำหนดส่งภายในวันที่ : {a.due_time}
                <Button color='error' size='small' sx={{ display: 'flex', fontFamily: 'Prompt', ml: 'auto' }} onClick={() => { handleClickDel(); setKeepid(a.id)}}><FiTrash />ลบ</Button>
              </div>
              }
            </div>
          </Paper>
        </div>
        ))
        }
        {/* <div className='post-paper-act' style={{ margin:'auto' }}>
          <Paper elevation={2} sx={{ width: '100%', mt:'1rem', pt: '2rem', pb: '2rem' }}>
            <div className='buttoneq'>
              <Button variant="contained" size='medium' color= 'primary' onClick={handleClickQuizw} sx={{ width: '100%', m:'auto', fontFamily: 'Prompt', fontWeight: 'bold' }}>
                <RiCalendarCheckFill size={28} style={{ marginRight: '0.5rem' }} />กิจกรรมที่ 2<br/>เก็บไข่ไดโนเสาร์
              </Button>
              <div className='expdate'>
                กำหนดส่งภายในวันที่ : 14/03/2022 12:00 
                <Button color='error' size='small' sx={{ display: 'flex', fontFamily: 'Prompt', ml: 'auto' }} onClick={handleClickDel}><FiTrash />ลบ</Button>
              </div>
            </div>
          </Paper>
        </div>
        <div className='post-paper-act' style={{ margin:'auto' }}>
          <Paper elevation={2} sx={{ width: '100%', mt:'1rem', pt: '2rem', pb: '2rem' }}>
            <div className='buttoneq'>
              <Button variant="contained" size='medium' color= 'primary' onClick={handleClickQuizw} sx={{ width: '100%', m:'auto', fontFamily: 'Prompt', fontWeight: 'bold' }}>
                <RiCalendarCheckFill size={28} style={{ marginRight: '0.5rem' }} />กิจกรรมที่ 3<br/>เก็บไข่ไดโนเสาร์
              </Button>
              <div className='expdate'>
                กำหนดส่งภายในวันที่ : 31/03/2022 00:00 
                <Button color='error' size='small' sx={{ display: 'flex', fontFamily: 'Prompt', ml: 'auto' }} onClick={handleClickDel}><FiTrash />ลบ</Button>
              </div>
            </div>
          </Paper>
        </div> */}
        {/* Quiz Waterplant */}
        <Dialog open={quizw} onClose={handleClose}>
        <DialogTitle sx={{ m: 'auto', fontFamily: 'Prompt' }}><div className='title'>กิจกรรมเก็บไข่ไดโนเสาร์</div></DialogTitle>
          <DialogContentText sx={{ fontFamily: 'Prompt' }}>
            <div className='question'>คุณต้องเก็บไข่ไดโนเสาร์หรือไม่ ?</div>
          </DialogContentText>
          <DialogContent>
            <img className='dinoegg' alt='dinoegg' src={dinoegg}/>
          </DialogContent>
            <DialogActions>
              <Stack ml={'auto'} mr={'auto'} direction='row' spacing={1} pb={2}>
                <Button variant="contained" color='success' onClick={handleDoAct} sx={{ fontFamily: 'Prompt' }}><div className='access'>เก็บ</div></Button>
                <Button variant="contained" color="error" onClick={handleClose} sx={{ fontFamily: 'Prompt' }}><div className='denied'>ไม่เก็บ</div></Button>
              </Stack>
            </DialogActions>
        </Dialog>
        { /* Delete Quiz */}
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

export default Activity