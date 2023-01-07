import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../Styles/Login.css'

function Login() {
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
        "email": inputs.username,
        "password": inputs.password,
        "expiresIn": 60000
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3333/login", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.status === 'ok'){
            MySwal.fire({
              html: <i>{result.message}</i>,
              icon: 'success'
            }) .then((value) => {
              localStorage.setItem('token' , result.token)
              navigate('/profile')
            })
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
    <div className='login-box'>
      <h5>เข้าสู่ระบบ</h5>
     <form onSubmit={handleSubmit} className='login-from'>
      <label>
      <input 
        type="text" 
        name="username"
        placeholder="E-mail" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>
        <input 
          type="password" 
          name="password" 
          placeholder="password"
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
          <input type="submit" name='submit' className='button' value="Enter" />
    </form>
    <div className='a-box'>
     <a href='/register'>หากไม่เคยลงทะเบียน</a>
    </div>
    </div>
    </>
  )
}

export default Login