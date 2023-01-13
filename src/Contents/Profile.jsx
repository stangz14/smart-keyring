import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from "../Components/Navbar";
import ReactDOM from 'react-dom/client';
import "../Styles/Profile.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import QRCode from 'qrcode'



function Profile() {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState({});
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [bloodtype, setBloodtype] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emergencynumber, setEmergencynumber] = useState("");
  const [foodallergies, setFoodallergies] = useState("");
  const [drugallergy, setDrugallergy] = useState("");
  const [congenitaldisease, setCongenitaldisease] = useState("");


  const [url, setUrl] = useState('')
  const [qr, setQr] = useState('')


  


  const GenerateQRCode = () => {

    setUrl('https://smart-keyring.netlify.app/accident/?id=' + user.id)
    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#EEEEEEFF'
      }
    }, (err, url) => {
      if (err) return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })

      console.log(url)
      setQr(url)
      Swal.fire({
        title: 'QR code',
        showCancelButton: true,
        confirmButtonText: 'Download',
        imageUrl: url,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log(qr);
          fetch(qr, {
            method: "GET",
            headers: {}
          })
            .then(response => {
              response.arrayBuffer().then(function(buffer) {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "qr.png"); //or any other extension
                document.body.appendChild(link);
                link.click();
              });
            })
            .catch(err => {
              console.log(err);
            });
        } 
      })
    })
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire ({
      title: 'Now loading',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
        
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
   })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": user.id,
      "fname": fname,
      "lname": lname,
      "foodallergies": foodallergies,
      "drugallergy": drugallergy,
      "emergencynumber": emergencynumber,
      "congenitaldisease": congenitaldisease,
      "bloodtype": bloodtype,
      "phonenumber": phonenumber,
      "age": age
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://aggressive-ant-tunic.cyclic.app/update", requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result) })
      .catch(error => console.log('error', error));
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://aggressive-ant-tunic.cyclic.app/authen", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          setUser(result.user)
          console.log(user)
        } else {
          navigate('/')
        }
      })
      .catch(error => console.log('error', error));
  }, []);
  



  



  return (
    <>
      <div className='profile-con'>
        <div className='pro-box'>
          <h1>ข้อมูลส่วนบุคคล</h1>
          <div className='qr-box'>
              
              <button onClick={GenerateQRCode}>รับ QRcode</button>
            </div>
          <form className='login-from' onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="faname"
                placeholder={user.fname}
                value={fname || ""}
                onChange={event => setFname(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                name="lname"
                placeholder={user.lname}
                value={lname || ""}
                onChange={event => setLname(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                name="age"
                placeholder={user.age}
                value={age || ""}
                onChange={event => setAge(event.target.value)}
              />
            </label>
            <label>
            <select name="bloodtype" placeholder={ user.bloodtype} value={bloodtype} onChange={event => setBloodtype(event.target.value)}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </label>
            <label>
              <input
                type="text"
                name="phonenumber"
                placeholder={user.phonenumber}
                value={phonenumber || ""}
                onChange={event => setPhonenumber(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                name="emergencynumber"
                placeholder={user.emergencynumber}
                value={emergencynumber || ""}
                onChange={event => setEmergencynumber(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                name="foodallergies"
                placeholder={user.foodallergies}
                value={foodallergies || ""}
                onChange={event => setFoodallergies(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                name="drugallergy"
                placeholder={user.drugallergy}
                value={drugallergy || ""}
                onChange={event => setDrugallergy(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                name="congenitaldisease"
                placeholder={user.congenitaldisease}
                value={congenitaldisease || ""}
                onChange={event => setCongenitaldisease(event.target.value)}
              />
            </label>
            <input type="submit" className='button' value="เปลี่ยนข้อมูล" />
            </form>
           
        </div>
      </div>
    </>
  )
}

export default Profile