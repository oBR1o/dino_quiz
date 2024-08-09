import { Button, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import './AllResultAct.css'

function AllResultAct() {
  return (
    <div>
        <Header />
        <div className='paper-result' style={{ margin: 'auto' }}>
            <Paper elevation={3} sx={{ width: '55%', marginLeft: 'auto', marginRight: 'auto', marginTop: '3rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', }}>
                <h2 className='resultname'>ผลการทำกิจกรรมรายวิชา 240-124</h2>
                <div className='all-name'>
                    <Link to="/240-124/ResultAct">
                        <Button href="./ResultAct" className='name-student' sx={{ width: '100%', height: '3rem', fontFamily: 'Prompt', color: 'black' }}>
                            กฤตเมธ รุ่งเรืองทิพย์
                        </Button>
                    </Link>
                    <Button className='name-student' sx={{ width: '100%', height: '3rem', fontFamily: 'Prompt', color: 'black' }}>
                        จิเฟอร์ดินานต์ เจะและ
                    </Button>
                    <Button className='name-student' sx={{ width: '100%', height: '3rem', fontFamily: 'Prompt', color: 'black' }}>
                        ณัฐวุฒิ สุขไสย์
                    </Button>
                    <Button className='name-student' sx={{ width: '100%', height: '3rem', fontFamily: 'Prompt', color: 'black' }}>
                        มูฮัมหมัดโยฮัน กาเจ
                    </Button>
                    <Button className='name-student' sx={{ width: '100%', height: '3rem', fontFamily: 'Prompt', color: 'black' }}>
                        บรรณารักษ์ สงเจิม
                    </Button>
                    <Button className='name-student' sx={{ width: '100%', height: '3rem', fontFamily: 'Prompt', color: 'black' }}>
                        ปรานต์ ติณสูลานนท์
                    </Button>
                </div>
            </Paper>
        </div>
    </div>
  )
}

export default AllResultAct