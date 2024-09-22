import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from '../components/ui/label';
import {Button} from "../components/ui/button";
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

const api = axios.create({
    baseURL: "http://localhost:3000" // put this in env for hosting
});

const schema = z.object({
    username: z.string().min(4, {message: "Username must contain at least 4 characters"}).max(25, {message: "Username should be under 25 characters"}), // this is for sign up 
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must contain at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

const [error, setError] = useState<string | null>(null);

const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await api.post("/api/user/signup", {
        name: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
    } catch (error) {
      if(axios.isAxiosError(error) && error.response){
        const err = error as AxiosError;
        setError(err.response?.data.message);
        console.log(err.response?.data.message);
      }
      else{
        setError("An error occurred while creating the user. Please try again later.");
        console.log("An error occurred while creating the user. Please try again later.");
      }
    }
}

const Login = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema), // This makes it so that zod is the one validating if values are within rules or not. not using the default way hook forms do.
    });
  return (
    <Card className="w-1/3 mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Create an account to start posting</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Username</Label>
              <Input
                {...register("username")}
                id="username"
                placeholder="Username"
              />
              {errors.username && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4"></AlertCircle>
                  <AlertDescription>
                    {errors.username.message && (
                      <p>{errors.username.message}</p>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} id="email" placeholder="Email" />
              {errors.email && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4"></AlertCircle>
                  <AlertDescription>
                    {errors.email.message && <p>{errors.email.message}</p>}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                placeholder="Password"
              />
              {errors.password && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4"></AlertCircle>
                  <AlertDescription>
                    {errors.password.message && (
                      <p>{errors.password.message}</p>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Loading..." : "Create Account"}
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4"></AlertCircle>
            <AlertDescription>
              {error && <p>{error}</p>}
            </AlertDescription>
          </Alert>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Login