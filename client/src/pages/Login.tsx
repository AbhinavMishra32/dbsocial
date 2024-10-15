import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from '../components/ui/label';
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { api } from '../services/axios';


const schema = z.object({
  username: z.string().min(4, { message: "Username must contain at least 4 characters" }).max(25, { message: "Username should be under 25 characters" }), // this is for sign up 
  password: z.string().min(8, { message: "Password must contain at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema), // This makes it so that zod is the one validating if values are within rules or not. not using the default way hook forms do.
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await api.post("/api/user/login", {
        name: data.username,
        password: data.password,
      }, {
        withCredentials: true,
      });
      console.log(response.data);
      const token = response.data.token;
      console.log("Token: ", token);
      console.log("Refresh token: ", response.data.refreshToken);
      setUser({
        id: response.data.id,
        token,
        username: response.data.name,
        email: response.data.email,
      });
      setError(null);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error as AxiosError;
        setError(err.response?.data.message);
        console.log(err.response?.data.message);
      } else {
        setError(
          "An error occurred while creating the user. Please try again later."
        );
      }
    }
  };
  useEffect(() => {
    console.log("User in useEffect: ", user);
  }, [user])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side - Random image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://source.unsplash.com/random?nature"
          alt="Random nature"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-xl">Sign in to continue your journey with us.</p>
        </div>
      </div>

      {/* Right side - Sign-in form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div>
                <Label htmlFor="identifier" className="sr-only">
                  Email or Username
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email or Username"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                {/* <div className="w-full border-t border-gray-300" /> */}
              </div>
              {/* <div className="relative flex justify-center text-sm"> */}
              {/* <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span> */}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* <Button variant="outline" className="w-full"> */}
            {/* < className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.github className="w-5 h-5 mr-2" />
                GitHub */}
            {/* </Button> */}
          </div>
        </div>
      </div>
    </div>
    // </div >
  );
};

export default SignUp