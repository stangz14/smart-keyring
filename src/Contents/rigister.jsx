import { useState } from 'react';

import {Navigate, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../Styles/Register.css'



function Rigister() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
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
    const [email ,setEmail] = useState("");
    const [password ,setpassword] = useState("");



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password,
      "fname": fname,
      "lname": lname,
      "age": age,
      "foodallergies": foodallergies,
      "drugallergy": drugallergy,
      "emergencynumber": emergencynumber,
      "congenitaldisease": congenitaldisease,
      "bloodtype": bloodtype,
      "phonenumber": phonenumber
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://aggressive-ant-tunic.cyclic.app/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          MySwal.fire({
              html: <i>{result.message}</i>,
              icon: 'success'
          }).then((value) => {
              navigate('/policy')
          });
      } else {
          MySwal.fire({
              html: <i>{result.message}</i>,
              icon: 'error'
          })
      }
      })
      .catch(error => console.log('error', error));
    
  }
  return (
    <>
    <div className='re-box'>
      <h5>ลงทะเบียน</h5>
      <form onSubmit={handleSubmit}>
      <label>
      <input 
        type="text" 
        name="email" 
        placeholder="อีเมล"
        value={email || ""} 
            onChange={event => setEmail(event.target.value)}
      />
      </label>
      <label>
        <input 
          type="password" 
          name="รหัสผ่าน" 
          placeholder="password"
          value={password || ""} 
            onChange={event => setpassword(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="fname" 
            placeholder="ชื่อ"
            value={fname || ""} 
            onChange={event => setFname(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="lname" 
            placeholder="นามสกุล"
            value={lname || ""} 
            onChange={event => setLname(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="age" 
            placeholder="อายุ"
            value={age || ""} 
            onChange={event => setAge(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="bloodtype" 
            placeholder="กรุ๊ปเลือด"
            value={bloodtype ||''}
            onChange={event => setBloodtype(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="phonenumber" 
            placeholder="เบอร์โทร"
            value={phonenumber || ""} 
            onChange={event => setPhonenumber(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="emergencynumber" 
            placeholder="เบอร์ฉุกเฉิน"
            value={emergencynumber || ""} 
            onChange={event => setEmergencynumber(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="foodallergies" 
            placeholder="อาหารที่แพ้"
            value={foodallergies || ""} 
            onChange={event => setFoodallergies(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="drugallergy" 
            placeholder="ยาที่แพ้"
            value={drugallergy || ""} 
            onChange={event => setDrugallergy(event.target.value)}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="congenitaldisease" 
            placeholder="โรคประจำตัว"
            value={congenitaldisease || ""} 
            onChange={event => setCongenitaldisease(event.target.value)}
        />
        </label>
        
        <input type="submit" value="submit"/>
    </form>
    <div className='check-box'>
        <input type="checkbox" /><p>ยอมรับข้อตกลงการใช้ข้อมูลส่วนบุคคล</p>
        </div>
    <div className='a-box'>
      <a href='/login'>หากมีบัญชีอยู่แล้ว</a>
    </div>
    </div>
    </>
  )
}

export default Rigister