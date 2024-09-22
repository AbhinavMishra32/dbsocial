import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from '../components/ui/label';
import {Button} from "../components/ui/button";
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';

const schema = z.object({
    // username: z.string().min(4).max(25), // this is for sign up 
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must contain at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//     username: string;
//     email: string;
//     password: string;
// }

const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
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
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to access the website</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
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
          <Button disabled={isSubmitting} className="w-full">{isSubmitting? "Loading..." : "Login"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Login