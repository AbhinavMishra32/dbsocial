import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card';

interface ProfileCardProps {
  username: string;
  email: string;
  isLocalUser: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  email,
  isLocalUser,
}) => {
  // fetch image from user object later and for that implement it in schema
  return (
    <div className="pt-20 pb-10">
      <Card className="rounded-3xl overflow-hidden">
        <CardHeader className="relative ">
          <div className="w-full h-20 rounded-xl overflow-hidden z-1">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="w-full h-full object-cover absolute top-0 left-0 overflow-hidden opacity-100 dark:opacity-30 blur-2xl"
            />
          </div>
          <div className="flex relative z-10 px-2">
            <div>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  username
                )}&background=random`}
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            </div>
            <div className='flex items-center px-4'>
              <div>
                <h1 className="text-xl font-bold">{username}</h1>
                <p className="text-md">{email}</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              {!isLocalUser && (
                <button className="flex items-center justify-center w-[100px] h-[30px] rounded-md bg-blue-500 text-white">
                  Follow
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg p-4 pb-2">About</p>
          <p className="px-4 py-2 text-gray-600 dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            blanditiis non. Cupiditate accusamus quae ipsam aut nostrum
            praesentium, a, at expedita autem commodi natus, sit vero quisquam
            voluptate totam voluptatibus.
          </p>
        </CardContent>
        {isLocalUser && (
          <div>
            <button className="w-full bg-blue-900 text-white p-2 rounded-b-3xl">
              Edit Profile
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProfileCard