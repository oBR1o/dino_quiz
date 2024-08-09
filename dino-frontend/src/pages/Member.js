import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { FiTrash, FiUserPlus } from "react-icons/fi";
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './Member.css'
import axios from 'axios';
import config from '../config';
// import ax from '../config/ax';

// function createDatat( firstname, lastname ) {
//   return { firstname, lastname };
// }

// const trows = [
//   createDatat('เพ็ญศรี', 'หกฉาก'),
// ];

// function createDatas( firstname, lastname ) {
//   return { firstname, lastname };
// }

// const srows = [
//   createDatas('กฤตเมธ', 'รุ่งเรืองทิพย์'),
//   createDatas('จิเฟอร์ดินานต์', 'เจะและ'),
//   createDatas('ณัฐวุฒิ', 'สุขไสย์'),
//   createDatas('มูฮัมหมัดโยฮัน', 'กาเจ'),
//   createDatas('บรรณารักษ์', 'สงเจิม'),
//   createDatas('ปรานต์', 'ติณสูลานนท์'),
// ];

function Member() {

  const [memlist, setMemlist] = useState([]);
  const [memtlist, setMemtlist] = useState([]);
  const [memslist, setMemslist] = useState([]);
  
  // let memtlist = [{}];
  // let memslist = [{}]; 

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

  useEffect (() => {
    const fetchMemberlist = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/memberlist/`)
      let memlist = result.data.results
      memlist.map ((a) =>{
        if (a.is_superuser === false){
          if (a.is_staff === true){
            memtlist.push(a)
          }else{
            memslist.push(a)
          }
        }
      })
    }
    fetchMemberlist();
    console.log(memtlist);
    console.log(memslist);
  }, []);

  // useEffect ( async () => {
  //   let result = await ax.get('/api/memberlist/')
  //   let memlist = result.data.results
  //   memlist.map ((a) =>{
  //     if (a.is_superuser === false){
  //       if (a.is_staff === true){
  //         setMemtlist([a])
  //       }else{
  //         setMemslist([a])
  //       }
  //     }
  //   })
  // }, []);
  // console.log(memtlist)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpent(false);
    setDel(false);
  };

  const [opent, setOpent] = React.useState(false);

  const handleClickOpent = () => {
    setOpent(true);
  };

  const [del, setDel] = React.useState(false);

  const handleClickDel = () => {
    setDel(true);
  };

  return (
    <div>
        <Header />
        { userRole == "คุณครู" &&
        <div className='post-button'>
          <Button variant="outlined" color="error" sx={{ mt: '1.5rem',ml: 'auto', mr: 'auto', display: 'block', fontFamily: 'Prompt', }} onClick={handleClickDel}><FiTrash />{' '}ลบห้องเรียน</Button>
        </div>
        }
        <TableContainer component={Paper} sx={{ width: '55%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: 'Prompt', fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '2px solid black'}}>คุณครู</TableCell>
                { userRole == "คุณครู" &&
                <TableCell style={{ borderBottom: '2px solid black' }}>
                  <Button sx={{ mt: '1.5rem', ml: 'auto' , display: 'block', fontFamily: 'Prompt', color: '#FF8C00' }} onClick={handleClickOpent}>
                    <FiUserPlus size={20}/>
                  </Button>
                </TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              { memtlist.map((row) => (
                <TableRow
                  key={row.first_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ fontFamily: 'Prompt' }}>
                    {row.first_name} {row.last_name}
                  </TableCell>
                  { userRole == "คุณครู" &&
                  <TableCell component="th" scope="row" style={{ fontFamily: 'Prompt', textAlign: 'right' }}>
                    <Button color='error' sx={{ fontFamily: 'Prompt' }} onClick={handleClickDel}><FiTrash />ลบ</Button>
                  </TableCell>
                  }
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: 'Prompt', fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '2px solid black'}}>นักเรียน</TableCell>
                { userRole == "คุณครู" &&
                <TableCell style={{ borderBottom: '2px solid black' }}>
                  <Button sx={{ mt: '1.5rem', ml: 'auto' , display: 'block', fontFamily: 'Prompt', color: '#FF8C00' }} onClick={handleClickOpen}>
                    <FiUserPlus size={20}/>
                  </Button>
                </TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {memslist.map((row) => (
                <TableRow
                  key={row.first_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ fontFamily: 'Prompt' }}>
                    {row.first_name} {row.last_name}
                  </TableCell>
                  { userRole == "คุณครู" &&
                  <TableCell component="th" scope="row" style={{ fontFamily: 'Prompt', textAlign: 'right' }}>
                    <Button color='error' sx={{ fontFamily: 'Prompt' }} onClick={handleClickDel}><FiTrash />ลบ</Button>
                  </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={opent} onClose={handleClose}>
          <DialogTitle sx={{ fontFamily: 'Prompt' }}>เพิ่มครู</DialogTitle>
          <DialogContent sx={{ marginTop: '1rem', width: 'auto', height: 'auto' }}>
          <Autocomplete
            multiple
            disablePortal
            id="addteacher"
            options={email}
            sx={{ width: '15rem' }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="อีเมล" />}
          />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ยกเลิก</Button>
          <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'green' }}>ยืนยัน</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontFamily: 'Prompt' }}>เพิ่มนักเรียน</DialogTitle>
          <DialogContent sx={{ marginTop: '1rem', width: 'auto', height: 'auto' }}>
          <Autocomplete
            multiple
            disablePortal
            id="addstudent"
            options={email}
            sx={{ width: '15rem' }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="อีเมล" />}
          />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'green' }}>ยืนยัน</Button>
          <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ยกเลิก</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={del} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: 'Prompt' }}>คุณต้องการลบหรือไม่ ?</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'red'}}>ไม่ใช่</Button>
        <Button onClick={handleClose} sx={{ fontFamily: 'Prompt', color: 'green' }}>ใช่</Button>
        </DialogActions>
        </Dialog>
    </div>
  )
}

const email = [
  { label: '6410110012@psu.ac.th' },
  { label: '6410110071@psu.ac.th' },
  { label: '6410110171@psu.ac.th' },
  { label: '6410110421@psu.ac.th' },
  { label: '6410110676@psu.ac.th' },
  { label: '6410110679@psu.ac.th' },
];

export default Member;