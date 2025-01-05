import React, { useState } from 'react';
import { ChevronDown, X,Eye,EyeClosed } from 'lucide-react';
import { Country, State } from "country-state-city";
import { FormData, Props } from './type';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
// import { ErrorResponse } from 'react-router-dom';



const SignupForm = ({setIsLogin}:Props) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    gender: '',
    country: '',
    state: '',
    place: '',
    hobbies: [],
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [hobby, setHobby] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status,setStatus]=useState('')

 // Get the list of countries and states
 const countries = Country.getAllCountries();
 const states = formData.country
   ? State.getStatesOfCountry(formData.country)
   : [];
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addHobby = () => {
    if (hobby && !formData.hobbies.includes(hobby)) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby]
      }));
      setHobby('');
    }
  };

  const removeHobby = (hobbyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h !== hobbyToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      newErrors.dobDay = 'Complete date of birth is required';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.place) newErrors.place = 'Place is required';
    if (formData.hobbies.length === 0) newErrors.hobbies = ['At least one hobby is required'];
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //no error
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      //  API request
    try {
      // console.log(formData)

      const response = await axios.post(BASE_URL + '/signup', formData);

      setStatus(response.data.msg || response.data.error);
     if(response.data.status) {
      setIsLogin(true)
     }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse & {message:string}>;
      if (axiosError.response) {

        setStatus(axiosError.response.data.message);
      } else {
        setStatus("An unexpected error occurred");
      }
    }
    }
   
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="dobDay"
                placeholder="Day"
                min="1"
                max="31"
                value={formData.dobDay}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
              <input
                type="number"
                name="dobMonth"
                placeholder="Month"
                min="1"
                max="12"
                value={formData.dobMonth}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
              <input
                type="number"
                name="dobYear"
                placeholder="Year"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.dobYear}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            {errors.dobDay && <p className="text-red-500 text-xs mt-1">{errors.dobDay}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex space-x-6">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Country and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border appearance-none"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <div className="relative">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border appearance-none"
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            {errors.place && <p className="text-red-500 text-xs mt-1">{errors.place}</p>}
          </div>

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Hobbies</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="Add a hobby"
              />
              <button
                type="button"
                onClick={addHobby}
                className="mt-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.hobbies.map((h, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {h}
                  <button
                    type="button"
                    onClick={() => removeHobby(h)}
                    className="ml-2 w-2 "
                  >
                    <X className="text-red-500 h-4 mx-auto " />
                  </button>
                </span>
              ))}
            </div>
            {errors.hobbies && <p className="text-red-500 text-xs mt-1">{errors.hobbies}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword?<Eye/>:<EyeClosed/>}
              </button>
              </div>
              
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className='relative'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword?<Eye/>:<EyeClosed/>}
              </button>
              </div>
              
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          {status && <p className="text-center text-red-500 mb-4">{status}</p>}
    
        </form>
      </div>
      <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            
              <a
                href="#"
                onClick={()=>setIsLogin(true)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Login
              </a>
            
          </p>
    </div>
  );
};

export default SignupForm;