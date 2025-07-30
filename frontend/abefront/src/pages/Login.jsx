import React from 'react'
import { useState } from 'react'
function Login() {
  
    const [emailAddress,setEmailAddress]=useState('');
    const [password,setPassword]=useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
   const data={
    email:emailAddress,
    password:password};
    const apiURl="http://13.60.68.82:4000/login";
    const requestOptions={
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const response=fetch(apiURl,requestOptions)
      .then(res => res.json())
      .then(res=>{console.log(res.message);
      setResponseMessage(res.message);
      })
    };
    return (
       <div>
        <p>{responseMessage}</p>
                      <h1>Login Form</h1>
  <form onSubmit={handleSubmit}>
      
    <label htmlFor="email">Email:</label><br />
     <input type="text" id="email" name="email" value={emailAddress} 
       onChange={event=>setEmailAddress(event.target.value)}/><br />
     <label htmlFor="password">Password:</label><br />
     <input type="text" id="password" name="password" value={password} 
       onChange={event=>setPassword(event.target.value)}/><br /><br />
     <input type="submit" value="Submit" />
  </form>
                      </div>
    )
}

export default Login