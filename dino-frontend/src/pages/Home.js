import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { FiPlus } from "react-icons/fi";
import './Home.css'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
// import ax from '../config/ax';
import { AuthContext } from '../auth';
import axios from 'axios';
import config from '../config';



function Home() {

    const [home, setHome] = useState([]);
    const [className, setClassName] = useState('');

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
        const fetchClassroom = async() => {
            let result = await axios.get(`${config.apiUrlPrefix}/homePage/`)
            setHome(result.data.results)
            console.log(result.data.results)
        }
        fetchClassroom();
    }, []);

//   useEffect(async () => {
//     let result = await ax.get('/api/homePage/')
//     setHome(result.data.results)
//     console.log(result.data.results)
//   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = home.length ? home[home.length - 1].id + 1 : 1;
    const newhome = {id, title: className};
    console.log(newhome)
    const result = await axios.post(`${config.apiUrlPrefix}/homePage/`, newhome)
    const allhome = [...home, result.data];
    console.log(allhome)
    setHome(allhome);
    setClassName('');
    // history.push('api/');
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
        <HomeHeader />
        { userRole === "คุณครู" &&
        <div>
        <Button variant="outlined" sx={{ display: 'block', mt: 3, ml: 3, fontFamily: 'Prompt' }} onClick={handleClickOpen}><FiPlus />{' '}ห้องเรียน</Button>
        </div>
        }
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ fontFamily: 'Prompt' }}>เพิ่มห้องเรียน</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="ชื่อห้องเรียน"
                type="name"
                fullWidth
                variant="standard"
                inputProps={{style: {fontFamily: "Prompt"}}}
                InputLabelProps={{style: {fontFamily: "Prompt"}}}
                value = {className}
                onChange ={(e) => setClassName(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ยกเลิก</Button>
            <Button type="submit" onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'green' }}>ยืนยัน</Button>
            </DialogActions>
            </form>
        </Dialog>
        <Link to= "/240-124/Announce" style={{ textDecoration: 'none' }}>
            <Card sx={{ width: '21rem', mt: 3, ml: 3, display: 'inline-flex' }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="150"
                    image="https://gstatic.com/classroom/themes/Math.jpg"
                    alt="class-background"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Prompt', }}>
                        240-124
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Prompt', }}>
                        คุณครู เพ็ญศรี หกฉาก
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    { home.map((h) => (
        <Card sx={{ width: '21rem', mt: 3,ml: 3, display: 'inline-flex' }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="150"
                image="https://gstatic.com/classroom/themes/Chemistry.jpg"
                alt="class-background"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Prompt' }}>
                    {h.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Prompt' }}>
                    ครู จักรกฤต ส่องแสง
                </Typography>
                 </CardContent>
            </CardActionArea>
        </Card>
        ))
    }
    </div>
  )
}

export default Home