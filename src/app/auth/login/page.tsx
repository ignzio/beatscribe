'use client'

import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { redirect } from 'next/navigation'
import { login } from '@/lib/features/auth/authSlice'
export default function Login() {
  //redux store
  const dispatch = useDispatch()

  const handleLogin = () => {
    // Dispatch the login action with user data as payload
    dispatch(login('John Doe'));
  };




  //form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('form submitted')
    //handle login
    handleLogin()
    //redirect to home page using nextjs route

    
    redirect('/')

  }

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-lg p-0
       md:p-6
        py-0
         md:py-12
        mx-auto space-y-8
       ">
        <div className="text-center">
          <h2 className="text-2xl font-bold md:text-6xl">Sign in to your account</h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            to enjoy all of our cool <span className="text-blue-400">features</span> ✌️
          </p>
        </div>
        <div className=" p-3
        md:p-8
         md:bg-white rounded-lg shadow-lg md:dark:bg-gray-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember_me"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-400 text-white font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register">
                <label className="font-medium text-blue-400 hover:text-blue-500">Register</label>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


// // src/lib/authSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   isAuthenticated: boolean;
//   user: string | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<string>) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;