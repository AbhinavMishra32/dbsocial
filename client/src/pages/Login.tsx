import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from '../components/ui/label';
import {Button} from "../components/ui/button";

const schema = z.object({
    username: z.string().min(4).max(25), // this is for sign up 
    email: z.string().email(),
    password: z.string().min(8),
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
        resolver: zodResolver(schema),
    });
  return (
      <Card className="w-1/3 mx-auto mt-20">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to access the website</CardDescription>
        </CardHeader>
            <form>
        <CardContent>
                <div className='grid w-full items-center gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='name'>Email</Label>
                        <Input {...register("email")} id="email" placeholder='Email' />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id="password" placeholder="Password" />
                    </div>
                </div>
        </CardContent>
        <CardFooter>
            <Button className='w-full'>Login</Button>
        </CardFooter>
            </form>
      </Card>
    // <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
    //     <input {...register("username")} type="text" placeholder="Username" className="ring ring-blue-500 rounded-full" />
    //     {errors.email && <p className="text-red-500">{errors.email.message}</p>}
    //     <input {...register("email")} type="email" placeholder="Email" className="ring ring-blue-500 rounded-full" />
    //     {errors.email && <p className="text-red-500">{errors.email.message}</p>}
    //     <input {...register("password")} type="password" placeholder="Password" className="ring ring-blue-500 rounded-full" />
    //     {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
    //     <button disabled={isSubmitting} type="submit" className="bg-blue-500 text-white rounded-full">
    //         {isSubmitting ? "Loading": "Submit"}
    //     </button>
    // </form>
  );
}

export default Login