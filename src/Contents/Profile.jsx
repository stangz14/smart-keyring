import React, {useState, useEffect} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar";
import ReactDOM from 'react-dom/client';
import "../Styles/Profile.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


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
      .then(result => {console.log(result)})
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

    fetch("http://localhost:3333/authen", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === 'ok'){
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
    <Navbar />
    <div className='profile-con'>
      <h1>profile</h1>
      <form  className='login-from' onSubmit={handleSubmit}>
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
          placeholder= {user.lname}
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
        <input 
            type="text" 
            name="bloodtype" 
            placeholder={user.bloodtype}
            value={bloodtype || ""} 
            onChange={event => setBloodtype(event.target.value)}
        />
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
          <input type="submit"  className='button' value="Enter" />
      </form>
    </div>
    </>
  )
}

export default Profile