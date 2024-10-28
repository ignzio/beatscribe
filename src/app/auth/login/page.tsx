'use client'

import React from 'react'
import Link from 'next/link'

export default function Login() {
  //form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('form submitted')
  }

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-lg p-6 py-12 mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            to enjoy all of our cool <span className="text-blue-400">features</span> ✌️
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-700">
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