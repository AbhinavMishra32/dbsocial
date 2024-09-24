import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useUser();
  const { username } = useParams();

  useEffect(() => {
    console.log("Username: ", username);
    // if (user && )
  })

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Username: {user?.username}</h2>
      <h2>Email: {user?.email}</h2>
    </div>
  )
}

export default ProfilePage