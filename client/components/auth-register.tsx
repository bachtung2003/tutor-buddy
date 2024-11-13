"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import GlobalApi from "@/services/globalApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  type Inputs = {
    username: string;
    password: string;
    role: string; // Add role field
  };

  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [role, setRole] = useState(""); // Track selected role

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const requestData = { ...data, role }; // Add role to the form data
    GlobalApi.registerUser(requestData).then((resp) => {
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setShowSuccessPopup(true);
      }
    });
  };

  const handleContinueToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full max-w-xs relative">
      {showSuccessPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="absolute top-0 right-0 left-0 mt-4 mx-auto w-64 bg-gray-200 text-black text-center p-3 rounded shadow-lg z-20">
            <p>Registration Successful!</p>
            <button
              onClick={handleContinueToLogin}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue to Login
            </button>
          </div>
        </>
      )}

      <div className={showSuccessPopup ? "blur-sm" : ""}>
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

          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Are you a student or a teacher?
            </p>
            <div className="flex items-center">
              <input
                type="radio"
                id="student"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
                className="mr-2"
              />
              <label htmlFor="student" className="mr-4">
                Student
              </label>

              <input
                type="radio"
                id="teacher"
                value="teacher"
                checked={role === "teacher"}
                onChange={() => setRole("teacher")}
                className="mr-2"
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <input
              type="submit"
              value="Register"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
