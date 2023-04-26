import React, { useState } from "react"
import styled from "styled-components"
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconLoader2,
} from "@tabler/icons-react"
import Header from "../components/Header"
import useCreateTrainer from "../hooks/useCreateTrainer"

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

const InputIconUser = styled(IconUser)`
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

const Spinner = styled(IconLoader2)`
  margin: 0 auto;
  -webkit-animation-name: spin;
  -webkit-animation-duration: 2000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;

  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const SignUp = (): JSX.Element => {
  const createTrainer = useCreateTrainer()
  const initialValues = {
    name: "",
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
    console.log(values.email)
    console.log(emailRegexp.test(values.email))
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
    createTrainer.mutate(values, {
      onSuccess: () => {
        setMessageText({ type: "success", message: "Successfully registered!" })
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
        <H2>Create account</H2>
        <Form onSubmit={handleOnSubmit}>
          <label htmlFor="name">Name</label>
          <InputContainer>
            <Input
              autoFocus
              name="name"
              onInput={handleOnInput}
              placeholder="Type a name"
              required
              type="text"
              value={values.name}
            />
            <InputIconUser />
          </InputContainer>
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
              minLength={8}
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
            <TextColor>Create account</TextColor>
          </Button>
        </Form>
        {createTrainer.isLoading && <Spinner />}
        {messageText.message.length > 0 && (
          <Message type={messageText.type}>{messageText.message}</Message>
        )}
      </Container>
    </BaseDiv>
  )
}

export default SignUp
