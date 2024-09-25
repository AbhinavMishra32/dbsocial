import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card';

interface ProfileCardProps {
  username: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, email }) => {
  // fetch image from user object later and for that implement it in schema
  return (
    <div className='pt-20 pb-10'>
      <Card className='rounded-3xl'>
        <CardHeader className="relative">
          <div className="w-full h-20 rounded-xl overflow-hidden z-1">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="w-full h-full object-cover absolute top-0 left-0 overflow-hidden"
            />
          </div>
          <div className="relative z-10 p-4">
            <h1 className="text-xl font-bold">{username}</h1>
            <p className="text-md">{email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg p-4 pb-2">About</p>
          <p className="px-4 py-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            blanditiis non. Cupiditate accusamus quae ipsam aut nostrum
            praesentium, a, at expedita autem commodi natus, sit vero quisquam
            voluptate totam voluptatibus.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard