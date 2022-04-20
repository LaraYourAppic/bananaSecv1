import React, {useState}from 'react';
import {Link, useHistory,} from 'react-router-dom';
import axios from "axios";

function SignUp() {

    const [email, setEmail] = useState('');
    const [username, setUseName]= useState('');
    const [password,setPassWord] = useState('');
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/register",
                {email:email,password:password, username:username}
        )
            history.push('/signin');
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <>
      <h1>Registreren</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email
                <input type="email" id="email" onChange={(e)=> setEmail(e.target.value)} value={email} />
            </label>
            <label htmlFor="password">Wachtwoord
                <input type="password" id="password"
                       onChange={(e)=> setPassWord(e.target.value)} value={password}                />
            </label>
            <label htmlFor="username">Username
                <input type="text" id="username"
                       onChange={(e)=> setUseName(e.target.value)} value={username}/>
            </label>
            <button type="submit"
            >Registreren</button>
        </form>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form>
        <p>*Invoervelden*</p>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;