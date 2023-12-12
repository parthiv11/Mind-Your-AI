import React, { useState } from "react"

import "~/contents/style.css"

import icon from "data-base64:~/assets/icon.png"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [key, setKey] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSignIn = () => {
    const message = {
      type: "login-attempt",
      input: {
        email: email,
        pass: password,
        key: key
      }
    }
    chrome.runtime.sendMessage(message, (response) => {
      if (response == "success") {
        setSuccess(true)
        setError(null)

      } else {
        setError(response["error"])
        setSuccess(false)
      }
    })
  }

  return (
    <>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert">
          <strong className="font-bold">Error! :</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div
            className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert">
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Successful Login
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              Enjoy using AI Anywhere
            </span>
            
          </div>
        </div>
      )}
      {
        <div className="w-full flex flex-wrap">
          {/*  Login Section  */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex flex-col justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
              <a
                href="https://github.com/parthiv11/Mind-Your-AI"
                className="bg-white text-white font-bold text-xl p-4">
                <img src={icon} width={50} />
              </a>
            </div>

            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <a href="https://github.com/parthiv11/Mind-Your-AI">
                <h1 className="text-center text-3xl font-bold">Mind Your AI</h1>
              </a>
              <div className="flex flex-col pt-3 md:pt-8">
                <div className="flex flex-col pt-4">
                  <label htmlFor="email" className="text-lg">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">
                    OpenAI Key
                  </label>
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="sk-...[AI FOR SAFETY]...."
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                  onClick={handleSignIn}>
                  Log IN
                </button>
              </div>
              <div className="text-center pt-12 pb-12">
                <p>
                  Don't have an account?
                  <a
                    href="https://cloud.mindsdb.com/"
                    className="underline font-semibold">
                    Create it here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Image Section  */}
          <div className="w-1/2 shadow-2xl">
            <img
              className="object-cover w-full h-screen hidden md:block"
              src="https://source.unsplash.com/random/?bear,animals,creative"
            />
          </div>
        </div>
      }
    </>
  )
}

export default SignIn
