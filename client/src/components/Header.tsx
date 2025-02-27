import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import DarkModeToggle from "./DarkModeToggle"
import useGetLoggedTrainerName from "../hooks/useGetLoggedTrainerName"
import useLogout from "../hooks/useLogout"
import { Button } from "./ui/button"

const Header = (): JSX.Element => {
  const { data } = useGetLoggedTrainerName()
  const logout = useLogout()
  const token = localStorage.getItem("token")

  const [showHelloMessage, setShowHelloMessage] = useState(false)

  useEffect(() => {
    setShowHelloMessage(data != null)
  }, [data])

  return (
    <nav className="flex border-0 border-b-2 border-solid border-black bg-white/30 shadow-lg transition-all ease-in-out dark:border-primary dark:bg-slate-900">
      <div className="my-0 flex w-full justify-between px-16 py-4">
        <Link className="text-black no-underline dark:text-primary" to="/">
          <h1 className="m-0 font-semibold">PokéAPI MERN project</h1>
        </Link>
        {showHelloMessage && data != null && (
          <>
            <h2 className="m-0">{`Hello ${JSON.stringify(data)}!`}</h2>
          </>
        )}
        <DarkModeToggle />
        <div className="flex flex-row gap-8">
          {token != null ? (
            <h2
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
            </h2>
          ) : (
            <Link
              className="text-black no-underline dark:text-primary"
              to="/login"
            >
              <Button>
                <h2 className="m-0 font-semibold">Log In</h2>
              </Button>
            </Link>
          )}
          <Link
            className="text-black no-underline dark:text-primary"
            to="/sign-up"
          >
            <Button>
              <h2 className="m-0 font-semibold">Sign Up</h2>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
