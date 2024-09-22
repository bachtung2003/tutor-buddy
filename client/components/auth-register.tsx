"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import GlobalApi from "@/app/_services/GlobalApi";

export default function Register() {
  type Inputs = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    GlobalApi.registerUser(data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-3xl font-bold text-center mb-6">Tutor Buddy</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && (
            <span className="text-red-500 text-xs italic">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 3 characters",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500 text-xs italic">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Register"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
      <p className="text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login here
        </Link>
      </p>
    </div>
  );
}
