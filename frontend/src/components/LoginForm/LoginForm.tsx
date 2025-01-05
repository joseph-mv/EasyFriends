import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { FormData } from "./type";
import { Props } from "../SignupForm/type";
import axios, { AxiosError } from "axios";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/userReducer";
import { useAppDispatch } from "../../redux/store";

const SignupForm = ({ setIsLogin }: Props) => {
  const navigate=useNavigate()
  const dispatch=useAppDispatch()
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
   const [status,setStatus]=useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //no error
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
    
        const response = await axios.post(BASE_URL + '/login', formData);
  
        setStatus(response.data.msg || response.data.error);
       if(response.data.status) {
        localStorage.setItem("token",response.data.token)
        // localStorage.setItem("user",JSON.stringify(response.data.user))
        dispatch(setUser(response.data.user))
       

        navigate('/')
       }
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          setStatus(
            "Invalid email or password"
          );
        } else {
          setStatus("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Fields */}
         
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
         
          {status && <p className="text-center text-red-500 mb-4">{status}</p>}
    
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={() => setIsLogin(false)}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
