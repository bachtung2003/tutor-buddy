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
    role: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    fullName?: string;
  };

  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [formData, setFormData] = useState<Partial<Inputs>>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitFirstStep: SubmitHandler<Inputs> = (data) => {
    setFormData({
      username: data.username,
      password: data.password,
      role: data.role,
    });
    setIsSecondStep(true);
    reset(); // Clear the inputs for the second step
  };

  const onSubmitSecondStep: SubmitHandler<Inputs> = (data) => {
    const completeData = { ...formData, ...data };
    GlobalApi.registerUser(completeData).then((resp) => {
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setShowSuccessPopup(true);
      }
    });
  };

  const handleReturnToFirstStep = () => {
    setIsSecondStep(false);
    reset(); // Clear the inputs for the first step
    // Clear the form data specific to the second step
    setFormData((prevData) => ({
      username: prevData.username,
      password: prevData.password,
      role: prevData.role,
    }));
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

        {!isSecondStep ? (
          <form
            onSubmit={handleSubmit(onSubmitFirstStep)}
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
                  {...register("role", { required: "Role is required" })}
                  className="mr-2"
                />
                <label htmlFor="student" className="mr-4">
                  Student
                </label>

                <input
                  type="radio"
                  id="teacher"
                  value="teacher"
                  {...register("role", { required: "Role is required" })}
                  className="mr-2"
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
              {errors.role && (
                <span className="text-red-500 text-xs italic">
                  {errors.role.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center">
              <input
                type="submit"
                value="Register"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmitSecondStep)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transform transition-transform"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <span className="text-red-500 text-xs italic">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be numeric",
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-xs italic">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                {...register("address", {
                  required: "Address is required",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.address && (
                <span className="text-red-500 text-xs italic">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs italic">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleReturnToFirstStep}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Return
              </button>
              <input
                type="submit"
                value="Confirm"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
        )}

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
