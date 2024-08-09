import React from 'react'
import './Headerlr.css'
import dinologo from '../imgfile/dinologo.png'

function Headerlr() {
    return (
        <div className="header">
            <div className="container">
                <div className="header-con">
                    <div className="logo-container">
                        <a href='/login'>
                            <img alt='dinologo' src={dinologo}/>Dino Quiz
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Headerlr