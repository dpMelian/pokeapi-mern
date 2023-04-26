import React, { useState } from "react"
import styled from "styled-components"
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react"
import Header from "../components/Header"
import useLogin from "../hooks/useLogin"

interface InputProps {
  isError?: boolean
}

interface MessageProps {
  type: string
}

const BaseDiv = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme["primary--darker"]};
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem auto;
  width: 80%;
`

const H2 = styled.h2`
  margin: 0 auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem;
  row-gap: 1rem;
  width: 30%;
`

const InputContainer = styled.div`
  position: relative;
`

const Input = styled.input<InputProps>`
  background-color: ${(props) => props.theme.secondary};
  border-radius: 4px;
  border: 2px solid
    ${(props) =>
      props.isError ?? false ? "red" : props.theme["primary--darker"]};
  box-sizing: border-box;
  height: 3rem;
  padding-left: 40px;
  width: 100%;
`

const InputIconMail = styled(IconMail)`
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const InputIconLock = styled(IconLock)`
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const InputIconEyeOff = styled(IconEyeOff)`
  cursor: pointer;
  right: 10px;
  position: absolute;
  transform: translateY(50%);
`

const InputIconEye = styled(IconEye)`
  cursor: pointer;
  right: 10px;
  position: absolute;
  transform: translateY(50%);
`

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme["primary--darker"]};
  box-sizing: border-box;
  cursor: pointer;
  height: 3rem;
  margin-top: 2rem;
  width: 100%;
`

const TextColor = styled.span`
  color: ${(props) => props.theme["primary--darker"]};
  font-family: "Kadwa";
  font-size: large;
`

const Message = styled.p<MessageProps>`
  border-radius: 5px;
  border: 2px solid ${(props) => (props.type === "error" ? "red" : "green")};
  margin: 0 auto;
  height: 2.5rem;
  width: 30%;
  text-align: center;
  box-sizing: border-box;
`

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
    <BaseDiv>
      <Header />
      <Container>
        <H2>Log in</H2>
        <Form onSubmit={handleOnSubmit}>
          <label htmlFor="email">Email</label>
          <InputContainer>
            <Input
              isError={emailInputErrorMessage.length > 0}
              name="email"
              onBlur={handleOnEmailBlur}
              onInput={handleOnInput}
              placeholder="Type an email"
              required
              type="email"
              value={values.email}
            />
            <InputIconMail />
          </InputContainer>
          {emailInputErrorMessage.length > 0 && (
            <span>{emailInputErrorMessage}</span>
          )}
          <label htmlFor="password">Password</label>
          <InputContainer>
            <Input
              isError={passwordInputErrorMessage.length > 0}
              name="password"
              onBlur={handleOnPasswordBlur}
              onInput={handleOnInput}
              placeholder="Type a password"
              required
              type={showPassword ? "text" : "password"}
              value={values.password}
            />
            <InputIconLock />
            {showPassword ? (
              <InputIconEye
                onClick={() => {
                  setShowPassword(false)
                }}
              />
            ) : (
              <InputIconEyeOff
                onClick={() => {
                  setShowPassword(true)
                }}
              />
            )}
          </InputContainer>
          {passwordInputErrorMessage.length > 0 && (
            <span>{passwordInputErrorMessage}</span>
          )}
          <Button type="submit">
            <TextColor>Log in</TextColor>
          </Button>
        </Form>
        {messageText.message.length > 0 && (
          <Message type={messageText.type}>{messageText.message}</Message>
        )}
      </Container>
    </BaseDiv>
  )
}

export default Login
