import React, { useEffect, useState } from 'react'
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import './Header.css'
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import dinologo from '../imgfile/dinologo.png'
import { useAuth } from '../auth';
import axios from 'axios';
import config from '../config';
// import ax from '../config/ax';


function Header() {

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
    
    let auth = useAuth();
    let navigate = useNavigate();

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
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
                    <div className="mobile-menu" onClick={handleClick}>
                        {click ? (
                            <FiX color='black'/>
                        ) : (
                            <FiMenu color='black'/>
                        )}
                    </div>
                    <div className="logo-container">
                        <Link to= "/home">
                        <a>
                            <img alt='dinologo' src={dinologo}/><div className="textlogo">Dino Quiz</div>
                        </a>
                        </Link>
                    </div>
                    <ul className={click ? "menu active" : "menu"}>
                        { userRole === "นักเรียน" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/Announce">
                            <a>ประกาศ</a>
                            </Link>
                        </li>
                        }
                        { userRole === "คุณครู" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/Announce">
                            <a>ประกาศ</a>
                            </Link>
                        </li>
                        }
                        { userRole === "นักเรียน" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/Activity">
                            <a>กิจกรรม</a>
                            </Link>
                        </li>
                        }
                        { userRole === "คุณครู" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/Activity">
                            <a>กิจกรรม</a>
                            </Link>
                        </li>
                        }
                        { userRole === "นักเรียน" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/ResultAct">
                            <a>ผลการทำกิจกรรม</a>
                            </Link>
                        </li>
                        }
                        { userRole === "คุณครู" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/AllResultAct">
                            <a>ผลการทำกิจกรรม</a>
                            </Link>
                        </li>
                        }
                        { userRole === "คุณครู" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/Member">
                            <a>สมาชิก</a>
                            </Link>
                        </li>
                        }
                        { userRole == "นักเรียน" &&
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to= "/240-124/Member">
                            <a>สมาชิก</a>
                            </Link>
                        </li>
                        }
                    </ul>
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
                        <Button onClick={handleMenu} sx={{ fontFamily: 'Prompt', fontWeight: 'bold', color: 'black' }}>{userRole}<br/> {userInfo.first_name} {userInfo.last_name}</Button>
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
                        >
                            <Link to="/profile" style={{ textDecoration: 'none', color: '#333'}}>
                                <MenuItem onClick={handleClose} sx={{ fontFamily: 'Prompt' }}><FiUser />โปรไฟล์</MenuItem>
                            </Link>
                            <Link to="/login" style={{ textDecoration: 'none', color: '#333' }} onClick={() => {auth.signout(() => navigate("/login"));}}>
                                <MenuItem onClick={handleClose} sx={{ fontFamily: 'Prompt' }}><FiLogOut />ออกจากระบบ</MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header