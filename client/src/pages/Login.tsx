import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react"
import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "../helpers/cn"
import { Input } from "@/components/ui/input"
import Footer from "../components/Footer"
import Header from "../components/Header"
import useLogin from "../hooks/useLogin"

const Login = (): JSX.Element => {
  const login = useLogin()
  const initialValues = {
    email: "",
    password: "",
  }

  const [values, setValues] = useState(initialValues)
  const [messageText, setMessageText] = useState({ type: "", message: "" })
  const [emailInputErrorMessage, setEmailInputErrorMessage] = useState("")
  const [passwordInputErrorMessage, setPasswordInputErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleOnEmailBlur = (): void => {
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (values.email.length === 0) {
      setEmailInputErrorMessage("Email is required")
    } else if (!emailRegexp.test(values.email)) {
      setEmailInputErrorMessage("This email address looks wrong")
    } else {
      setEmailInputErrorMessage("")
    }
  }

  const handleOnPasswordBlur = (): void => {
    if (values.password.length === 0) {
      setPasswordInputErrorMessage("Password is required")
    } else if (values.password.length < 8) {
      setPasswordInputErrorMessage("Password must be 8 or more characters")
    } else {
      setPasswordInputErrorMessage("")
    }
  }

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    login.mutate(values, {
      onSuccess: (res) => {
        const { token } = res.data
        localStorage.setItem("token", token)
        setMessageText({ type: "success", message: "Logged in!" })
      },
      onError: (error) => {
        if (error instanceof Error) {
          setMessageText({ type: "error", message: error.message })
        } else {
          setMessageText({
            type: "error",
            message: "There has been an error processing your request",
          })
        }
      },
    })
  }

  return (
    <div className="flex h-screen flex-col bg-primary dark:bg-slate-700 dark:text-white">
      <Header />
      <main className="mx-auto mb-auto mt-4 flex w-4/5 flex-col justify-center">
        <h2 className="mx-auto my-0">Log in</h2>
        <form
          className="mx-auto my-0 flex w-[30%] flex-col gap-4 p-8"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="email">Email</label>
          <div className="relative">
            <Input
              className={cn(
                "box-border h-12 w-full rounded-md border-2 border-solid pl-10 dark:bg-slate-700",
                emailInputErrorMessage.length > 0
                  ? "border-secondary dark:border-secondary"
                  : "border-black dark:border-primary",
              )}
              name="email"
              onBlur={handleOnEmailBlur}
              onInput={handleOnInput}
              placeholder="Type an email"
              required
              type="email"
              value={values.email}
            />
            <IconMail className="absolute left-3 top-3" />
          </div>
          {emailInputErrorMessage.length > 0 && (
            <span>{emailInputErrorMessage}</span>
          )}
          <label htmlFor="password">Password</label>
          <div className="relative">
            <Input
              className={cn(
                "box-border h-12 w-full rounded-md border-2 border-solid pl-10 dark:bg-slate-700",
                passwordInputErrorMessage.length > 0
                  ? "border-secondary dark:border-secondary"
                  : "border-black dark:border-primary",
              )}
              name="password"
              onBlur={handleOnPasswordBlur}
              onInput={handleOnInput}
              placeholder="Type a password"
              required
              type={showPassword ? "text" : "password"}
              value={values.password}
            />
            <IconLock className="absolute left-3 top-3" />
            {showPassword ? (
              <IconEye
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(false)
                }}
              />
            ) : (
              <IconEyeOff
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(true)
                }}
              />
            )}
          </div>

          {passwordInputErrorMessage.length > 0 && (
            <span>{passwordInputErrorMessage}</span>
          )}

          <Button type="submit">
            <span className="font-sans text-lg dark:text-primary">Log in</span>
          </Button>
        </form>
        {messageText.message.length > 0 && (
          <p
            className={cn(
              "mx-auto my-0 box-border h-10 w-[30%] rounded-md border-2 border-solid text-center text-sm",
              messageText.type === "error" ? "border-red" : "border-green-500",
            )}
          >
            {messageText.message}
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Login
