import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import DarkModeToggle from "./DarkModeToggle"
import flagEs from "../assets/flag-es.webp"
import flagGb from "../assets/flag-gb.webp"
import useGetLoggedTrainerName from "../hooks/useGetLoggedTrainerName"
import useLogout from "../hooks/useLogout"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const Header = (): JSX.Element => {
  const { t } = useTranslation()
  const { data } = useGetLoggedTrainerName()
  const logout = useLogout()
  const token = localStorage.getItem("token")

  const [showHelloMessage, setShowHelloMessage] = useState(false)

  useEffect(() => {
    setShowHelloMessage(data != null)
  }, [data])

  return (
    <nav className="dark:border-primary flex border-0 border-b-2 border-solid border-black bg-white/30 shadow-lg transition-all ease-in-out dark:bg-slate-900">
      <div className="my-0 flex w-full justify-between px-16 py-4">
        <Link className="dark:text-primary text-black no-underline" to="/">
          <h1 className="m-0 font-semibold">{t("page-title")}</h1>
        </Link>

        {showHelloMessage && data != null && (
          <>
            <h2 className="m-0">{`${t("hello")} ${JSON.stringify(data)}!`}</h2>
          </>
        )}

        <DarkModeToggle />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="en">
                <div className="flex gap-2">
                  <img alt="Flag of the United Kingdom" src={flagGb} />
                  <span>{t("english")}</span>
                </div>
              </SelectItem>
              <SelectItem value="es">
                <img alt="Flag of Spain" src={flagEs} />
                <span>{t("spanish")}</span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
              className="dark:text-primary text-black no-underline"
              to="/login"
            >
              <Button>
                <h2 className="m-0 font-semibold">Log In</h2>
              </Button>
            </Link>
          )}
          <Link
            className="dark:text-primary text-black no-underline"
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
