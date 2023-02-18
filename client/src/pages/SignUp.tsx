import React, { useState } from "react"
import styled from "styled-components"
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react"
import Header from "../components/Header"
import useCreateTrainer from "../hooks/useCreateTrainer"

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

const Input = styled.input`
  background-color: ${(props) => props.theme.primary};
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.brown};
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
  right: 10px;
  position: absolute;
  transform: translateY(50%);
`

const InputIconEye = styled(IconEye)`
  right: 10px;
  position: absolute;
  transform: translateY(50%);
`

const Button = styled.button`
  background-color: ${(props) => props.theme.brown};
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.brown};
  box-sizing: border-box;
  font-family: "Kadwa";
  height: 3rem;
  margin-top: 2rem;
  width: 100%;
`

const TextColor = styled.span`
  color: white;
  font-size: large;
`

const Message = styled.p`
  border-radius: 5px;
  border: 2px solid;
  width: 30%;
`

const SignUp = (): JSX.Element => {
  const createTrainer = useCreateTrainer()
  const initialValues = {
    name: "",
    email: "",
    password: "",
  }

  const [values, setValues] = useState(initialValues)
  const [messageText, setMessageText] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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
        setMessageText("Registered!")
      },
      onError: (error) => {
        if (error instanceof Error) {
          setMessageText(error.message)
        } else {
          setMessageText("There has been an error processing your request")
        }
      },
    })
  }

  return (
    <>
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
              name="email"
              onInput={handleOnInput}
              placeholder="Type an email"
              required
              type="email"
              value={values.email}
            />
            <InputIconMail />
          </InputContainer>
          <label htmlFor="password">Password</label>
          <InputContainer>
            <Input
              name="password"
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
          <Button type="submit">
            <TextColor>Create account</TextColor>
          </Button>
        </Form>
        {messageText.length > 0 && <Message>{messageText}</Message>}
      </Container>
    </>
  )
}

export default SignUp
