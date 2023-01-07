import { useState } from 'react';

import {Navigate, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../Styles/Register.css'



function Rigister() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [inputs, setInputs] = useState({});

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
    "email": inputs.email,
    "password": inputs.password,
    "fname": inputs.fname,
    "lname": inputs.lname,
    "age": inputs.age,
    "foodallergies": inputs.foodallergies,
    "drugallergy": inputs.drugallergy,
    "emergencynumber": inputs.emergencynumber,
    "congenitaldisease": inputs.congenitaldisease,
    "bloodtype": inputs.bloodtype,
    "phonenumber": inputs.phonenumber
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
        value={inputs.email || ""} 
        onChange={handleChange}
      />
      </label>
      <label>
        <input 
          type="password" 
          name="รหัสผ่าน" 
          placeholder="password"
          value={inputs.password } 
          onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="fname" 
            placeholder="ชื่อ"
            value={inputs.fname || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="lname" 
            placeholder="นามสกุล"
            value={inputs.lname || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="age" 
            placeholder="อายุ"
            value={inputs.age || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="bloodtype" 
            placeholder="กรุ๊ปเลือด"
            value={inputs.bloodtype || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="phonenumber" 
            placeholder="เบอร์โทร"
            value={inputs.phonenumber || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="emergencynumber" 
            placeholder="เบอร์ฉุกเฉิน"
            value={inputs.emergencynumber || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="foodallergies" 
            placeholder="อาหารที่แพ้"
            value={inputs.foodallergies || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="drugallergy" 
            placeholder="ยาที่แพ้"
            value={inputs.drugallergy || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="congenitaldisease" 
            placeholder="โรคประจำตัว"
            value={inputs.congenitaldisease || ""} 
            onChange={handleChange}
        />
        </label>
        
        <input type="submit" value="submit"/>
    </form>
    <div className='a-box'>
      <a href='/login'>หากมีบัญชีอยู่แล้ว</a>
    </div>
    </div>
    </>
  )
}

export default Rigister