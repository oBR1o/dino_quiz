import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './ResultAct.css'
import lotegg from '../imgfile/lotegg.jpg'
import axios from 'axios'
import config from '../config'
// import ax from '../config/ax'

function ResultAct() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/activityPage/`);
      setActivity(result.data.results);
    }
    fetchActivity();
  }, []);

  function countDoAct(){
    var count = 0
    activity.map((a) => {
      if(a.activity_status === true){
        count += 1
      }
    })
    return count
  }

  let allCountAct = countDoAct();

  useEffect(async () => {
    let result = await axios.get(`${config.apiUrlPrefix}/activityPage/`)
    setActivity(result.data.results)
    console.log(activity)
  }, []);

  return (
    <div>
        <Header />
        <div className='paper' style={{ margin: 'auto' }}>
          <Paper elevation={3} sx={{ width: '55%', height:'auto', marginTop: '1.5rem', ml: 'auto', mr: 'auto' }}>
            <img className='imgwatering-result' alt='waterplant' src={lotegg} style={{ paddingTop: '1rem', marginTop: '2rem', margin: 'auto' }}/>
            <div className='actname' style={{ textAlign: 'center', fontFamily: 'Prompt' }}><h3>คุณเก็บไข่ไดโนเสาร์ไปแล้ว</h3></div>
            <div className='Count'style={{ paddingBottom: '2rem', textAlign: 'center', fontFamily: 'Prompt' }}> {allCountAct}/{activity.length} ครั้ง</div>
          </Paper>
        </div>
    </div>
  )
}

export default ResultAct