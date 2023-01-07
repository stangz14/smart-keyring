import React, { Component,useState,useEffect } from "react";
// import styled from 'styled-components'
import "../Styles/Home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom'

function Home(){

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [fname , setFname] = useState(null);
  
  const [id, setId] = useState(null);
  const [name ,setName] =useState("");
  var i = 0;
  var email

  useEffect(() => {
    setId(searchParams.get('id'));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": id
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://aggressive-ant-tunic.cyclic.app/profile", requestOptions)
      .then(response => response.json())
      .then(result => {setName(result.user) 
      //  console.log(result.user.email)
      // setFname(result.user.email)
    }
      )
      .catch(error => console.log('error', error));
    

  } ,[]);
  


  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        notify();
        console.log(`https://www.google.com/maps/place/${latitude},${longitude}`);
        var myHeaders = new Headers();
        let po = `https://www.google.com/maps/place/${latitude},${longitude}`;
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "password": po
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://aggressive-ant-tunic.cyclic.app/send", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

          const notify = () => toast.success("ขอบคุณสำหรับการแจ้งเหตุ ตอนนี้ทางกู้ภัยกำลังรีบดำเนินการไปหาท่าน", {
        position:"top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
            });
       

  
        return (
            <div className="home" id="home">
              <h3>sd</h3>
              <br/>
              <h3 className="home-text">กดปุ่มเพื่อแจ้งเตือน</h3>
              <div className="button-con">
                <ul className="ul-b">
                  <li style={{ backgroundColor: '#ff0000'}} onClick={getLocation}>อุบัติเหตุทั่วไป</li>              
                  <li style={{ backgroundColor: '#ffff00'}} onClick={getLocation} >อุบัติเหตุทางรถ</li>
                  <li style={{ backgroundColor: '#00d300'}} onClick={getLocation} >แจ้งผู้ป่วยฉุกเฉิน</li>
                </ul>
                <ToastContainer />
              </div>
          </div>
        );
    }

		

export default Home;