import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUsernameField,
  updateEmailField,
  updatePasswordField,
  updateConfirmPasswordField,
  register
} from '../redux/reducers/register'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const username = useSelector((s) => s.reg.username)
  const email = useSelector((s) => s.reg.email)
  const password = useSelector((s) => s.reg.password)
  const confirmPassword = useSelector((s) => s.reg.confirmPassword)
  const isPasswordMatch = () => {
    return password === confirmPassword && password.length > 5
  }
  const [isCorrect, setIsCorrect] = useState(false)
  const registerOnClick = () => {
    setIsCorrect(
      /^\w{3,}$/.test(username) && /^\w{3,}@\w+\.\w{1,3}$/.test(email) && isPasswordMatch()
    )
    if (isCorrect) {
      dispatch(register())
    }
  }
  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-6">
              <div className="text-center font-semibold text-black">
                Do you want join to our party?
              </div>
              <div className="text-center font-base text-black">Register first</div>
              <form className="mt-8" x-data="{password: '',password_confirm: ''}">
                <div className="mx-auto max-w-lg ">
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Username</span>
                    <input
                      placeholder=""
                      type="text"
                      className={`text-md block px-3 py-2 rounded-lg w-full
                bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white ${
                  /^\w{3,}$/.test(username)
                    ? 'border-2 border-green-300 focus:border-green-600 focus:outline-none'
                    : 'border-2 border-gray-300 focus:border-red-600 focus:outline-none'
                }`}
                      value={username}
                      onChange={(e) => {
                        dispatch(updateUsernameField(e.target.value))
                      }}
                    />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Email</span>
                    <input
                      placeholder=""
                      type="email"
                      className={`text-md block px-3 py-2 rounded-lg w-full
                      bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white ${
                        /^\w{3,}@\w+\.\w{1,3}$/.test(email)
                          ? 'border-2 border-green-300 focus:border-green-600 focus:outline-none'
                          : 'border-2 border-gray-300 focus:border-red-600 focus:outline-none'
                      }`}
                      value={email}
                      onChange={(e) => {
                        dispatch(updateEmailField(e.target.value))
                      }}
                    />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Password</span>
                    <input
                      placeholder=""
                      type="password"
                      x-model="password"
                      className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      value={password}
                      onChange={(e) => {
                        dispatch(updatePasswordField(e.target.value))
                      }}
                    />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Password Confirm</span>
                    <input
                      placeholder=""
                      type="password"
                      x-model="password_confirm"
                      className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      value={confirmPassword}
                      onChange={(e) => {
                        dispatch(updateConfirmPasswordField(e.target.value))
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                    onClick={registerOnClick}
                  >
                    Register
                  </button>
                </div>
                <div className="flex justify-start mt-3 ml-4 p-1">
                  <ul>
                    <li className="flex items-center py-1">
                      <div
                        className={`${
                          isPasswordMatch()
                            ? 'bg-green-200 text-green-700'
                            : 'bg-red-200 text-red-700'
                        } rounded-full p-1 fill-current`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {isPasswordMatch() ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          ) : (
                            <path
                              x-show="password != password_confirm || password.length == 0"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          )}
                        </svg>
                      </div>
                      <span
                        className={`${
                          isPasswordMatch() ? 'text-green-700' : 'text-red-700'
                        } font-medium text-sm ml-3`}
                      >
                        {isPasswordMatch() ? 'Passwords match' : 'Passwords do not match'}{' '}
                      </span>
                    </li>
                    <li className="flex items-center py-1">
                      <div
                        className={`${
                          isPasswordMatch()
                            ? 'bg-green-200 text-green-700'
                            : 'bg-red-200 text-red-700'
                        } rounded-full p-1 fill-current`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {password.length > 5 ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          )}
                        </svg>
                      </div>
                      <span
                        className={`${
                          password.length > 5 ? 'text-green-700' : 'text-red-700'
                        } font-medium text-sm ml-3`}
                      >
                        {password.length > 5
                          ? 'The minimum length is reached'
                          : 'At least 5 characters required'}
                      </span>
                    </li>
                  </ul>
                </div>
              </form>

              <div className="text-sm font-semibold block py-6 flex justify-center">
                <Link
                  to="/auth"
                  className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500"
                >
                  You are already member?
                  <span className="text-black font-semibold"> Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
