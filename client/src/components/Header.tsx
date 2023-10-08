import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import DarkModeToggle from "./DarkModeToggle"
import useGetLoggedTrainerName from "../hooks/useGetLoggedTrainerName"
import useLogout from "../hooks/useLogout"

const Header = (): JSX.Element => {
  const { data } = useGetLoggedTrainerName()
  const logout = useLogout()
  const token = localStorage.getItem("token")

  const [showHelloMessage, setShowHelloMessage] = useState(false)

  useEffect(() => {
    setShowHelloMessage(data != null)
  }, [data])

  return (
    <nav className="flex border-x-0 border-b-2 border-t-0 border-solid border-black bg-secondary dark:border-primary dark:bg-slate-900">
      <div className="mx-auto my-0 flex w-4/5 justify-between px-0 py-4">
        <Link className="text-black no-underline dark:text-primary" to="/">
          <h1 className="m-0">PokéAPI MERN project</h1>
        </Link>
        {showHelloMessage && data != null && (
          <>
            <h1 className="m-0">{`Hello ${JSON.stringify(data)}!`}</h1>
          </>
        )}
        <DarkModeToggle />
        <div className="flex flex-row gap-8">
          {token != null ? (
            <h1
              className="m-0 cursor-pointer"
              onClick={() => {
                logout.mutate(localStorage.getItem("token"), {
                  onSuccess: async () => {
                    localStorage.removeItem("token")
                    setShowHelloMessage(false)
                  },
                })
              }}
            >
              Log Out
            </h1>
          ) : (
            <Link
              className="text-black no-underline dark:text-primary"
              to="/login"
            >
              <h1 className="m-0">Log In</h1>
            </Link>
          )}
          <Link
            className="text-black no-underline dark:text-primary"
            to="/sign-up"
          >
            <h1 className="m-0">Sign Up</h1>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
