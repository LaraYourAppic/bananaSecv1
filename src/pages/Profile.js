import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext/AuthContext";
import axios from "axios";


function Profile() {
    const {isUser} = useContext(AuthContext)
    const [privateData, setPrivateData] = useState ('')


    useEffect(()=>{
       async function getPrivateData(){
           const token = localStorage.getItem('token')
           try{
               const result = await axios.get ("http://localhost:3000/660/private-content",
                   {headers: {
                           "Content-Type": "application/json",
                           Authorization: `Bearer ${token}`,

                       }})
               console.log(result)
               setPrivateData(result.data)


           }catch (e){
               console.error (e)
           }
       }
       getPrivateData()


    },[])


        return (
            <>
                <h1>Profielpagina</h1>
                <section>
                    <h2>Gegevens</h2>
                    <p><strong>Gebruikersnaam:</strong>{isUser.username}</p>
                    <p><strong>Email:</strong> {isUser.email}</p>
                </section>
                <section>
                    <h2>{privateData.title}</h2>
                    <p>{privateData.content}</p>
                </section>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </>
        );
    }

export default Profile;