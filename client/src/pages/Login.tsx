import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
    username: z.string().min(4).max(25),
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} type="text" placeholder="Username" className="ring ring-blue-500 rounded-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input {...register("email")} type="email" placeholder="Email" className="ring ring-blue-500 rounded-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input {...register("password")} type="password" placeholder="Password" className="ring ring-blue-500 rounded-full" />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>} 
        <button disabled={isSubmitting} type="submit" className="bg-blue-500 text-white rounded-full">
            {isSubmitting ? "Loading": "Submit"}
        </button>
    </form>
  )
}

export default Login