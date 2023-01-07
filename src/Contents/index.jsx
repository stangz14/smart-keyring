import React from 'react'
import '../Styles/index.css'



function Index() {
  
  return (
    <>
    <div className='index-box'>
        <div className='img-box'>
        <img src='https://scontent.fhdy2-1.fna.fbcdn.net/v/t1.15752-9/323697457_1507115913126717_8260913943112518473_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeG5zo1AQgcd5rvHhDT17-rJ8mRXvjKcm0LyZFe-MpybQoSX7-I7hEiTfrmA5_qd-eNFhLY_twB7q9j0ZAtDA97-&_nc_ohc=4Dw979KjpIAAX_faSlz&_nc_ht=scontent.fhdy2-1.fna&oh=03_AdQMhfrZ_Rf4cjP_u4W2Um0cFrykhWte1sCFNmKMW8TcjQ&oe=63E080B7' alt="Logo" />
        </div>
        <div className='bar'>
            <a href='/login'>เข้าสู่ระบบ</a>
            <a href='/register'>ลงทะเบียน</a>
        </div>
    </div>
    </>
  )
}

export default Index