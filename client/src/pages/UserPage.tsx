import React, { useEffect, useMemo, useState } from 'react'
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { api } from '../services/axios';
import ProfileCard from '../components/ProfileCard';

const UserPage = () => {
  const {user} = useUser();
  const { username: linkUsername } = useParams();
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const localUser = useMemo(() => {
    return user && user.username === linkUsername;
  }, [user, linkUsername]);

  useEffect(() => {
    // console.log("User: ", localUser);
    // if (user?.username === username) return;
    // console.log("Username: ", linkUsername);
    // console.log("Local User: ", localUser);
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${linkUsername}`);
        setIsLoading(false);
        setFetchedUser(response.data.user);
        console.log("USER FETCHED: ", response.data.user);
        console.log(response);
      } catch (error) {
        console.log("Error occured while fetching: ", error);
      }
    };
    fetchUser();
  }, [linkUsername, localUser]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Profile Page</h1>
          <h2>Username: {linkUsername}</h2>
          <h2>Fetched username: {fetchedUser.name}</h2>
          <h2>Profile is that of user which is logged in : {localUser ? "True" : "No"}</h2>
          <ProfileCard username={fetchedUser.name} email={fetchedUser.email} />
        </>
      )}
    </div>
  )
}

export default UserPage