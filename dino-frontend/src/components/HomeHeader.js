import React, { useEffect, useState } from 'react'
import { FiLogOut, FiUser } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import './HomeHeader.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dinologo from '../imgfile/dinologo.png'
// import ax from '../config/ax';
import axios from 'axios';
import config from '../config';


function HomeHeader(props) {

    const [userInfo, setUserInfo] = useState([]);
    const [userRole, setUserRole] = useState(['']);

    useEffect(() => {
        const fetchUserinfo = async () =>{
            let result = await axios.get(`${config.apiUrlPrefix}/whoami/`);
            setUserInfo(result.data);
            if(result.data.is_staff === true){
                setUserRole('คุณครู');
            }else{
                setUserRole('นักเรียน');
            }
        }
        fetchUserinfo();
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="header">
            <div className="container">
                <div className="header-con">
                    <div className="logo-container">
                        <Link to= "/home">
                            <a href='/home'>
                                <img alt='dinologo' src={dinologo}/><div className="textlogo">Dino Quiz</div>
                            </a>
                        </Link>
                    </div>
                    <div className="role-name">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                        </IconButton>
                        <Button onClick={handleMenu} sx={{ fontFamily: 'Prompt', fontWeight: 'bold', color: 'black' }}>
                            {userRole}<br/> {userInfo.first_name} {userInfo.last_name}</Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{ width: 600 }}
                        >
                            <Link to="/profile" style={{ textDecoration: 'none', color: '#333'}}>
                                <MenuItem onClick={handleClose} sx={{ fontFamily: 'Prompt' }}><FiUser />โปรไฟล์</MenuItem>
                            </Link>
                            <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>
                                <MenuItem onClick={handleClose} sx={{ fontFamily: 'Prompt' }}><FiLogOut />ออกจากระบบ</MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader