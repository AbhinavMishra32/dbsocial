import React, { useEffect } from 'react'
import {useUser} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {user} = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  })
  return (
    <div>Home</div>
  )
}

export default Home