"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import GlobalApi from "@/services/globalApi";
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

export default function Login() {
  type Inputs = {
    username: string;
    password: string;
    role: string;
  };

  const router = useRouter(); // Initialize the router

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    GlobalApi.loginUser(data).then((resp) => {
      if (resp.data.error) {
        alert(resp.data.error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      } else {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-center mb-4">
        <Image src={"/logo.svg"} alt="logo" width={140} height={100} />
      </div>
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
            value="Login"
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
      <p className="text-center text-gray-600 text-sm">
        Doesn&apos;t have an account?{" "}
        <Link href="/" className="text-primary hover:text-blue-700">
          Register here
        </Link>
      </p>
    </div>
  );
}
