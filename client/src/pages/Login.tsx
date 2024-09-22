import { useForm } from 'react-hook-form';

type FormFields = {
    username: string;
    email: string;
    password: string;
}

const Login = () => {
    const form = useForm<FormFields>();
  return (
    <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="ring ring-blue-500 rounded-full" />
        <input type="email" placeholder="Email" className="ring ring-blue-500 rounded-full" />
        <input type="password" placeholder="Password" className="ring ring-blue-500 rounded-full" />
        <button type="submit" className="bg-blue-500 text-white rounded-full">Login</button>
    </form>
  )
}

export default Login