import React, { useState } from "react"
import styled from "styled-components"
import { IconUser, IconMail, IconLock } from "@tabler/icons-react"
import Header from "../components/Header"
import useCreateTrainer from "../hooks/useCreateTrainer"

const Container = styled.main`
  width: 80%;
  margin: 1rem auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 30%;
`

const InputContainer = styled.div`
  position: relative;
`

const Input = styled.input`
  height: 2rem;
  border-radius: 5px;
  padding-left: 40px;
`

const InputIconUser = styled(IconUser)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`

const InputIconMail = styled(IconMail)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`

const InputIconLock = styled(IconLock)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`

const Button = styled.button`
  height: 2rem;
  border-radius: 5px;
`

const Message = styled.p`
  border: 2px solid;
  border-radius: 5px;
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
        setMessageText(error.message)
      },
    })
  }

  return (
    <>
      <Header />
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={handleOnSubmit}>
          <InputContainer>
            <Input
              name="name"
              type="text"
              placeholder="Type a name"
              value={values.name}
              onInput={handleOnInput}
              required
            />
            <InputIconUser />
          </InputContainer>
          <InputContainer>
            <Input
              name="email"
              type="email"
              placeholder="Type an email"
              value={values.email}
              onInput={handleOnInput}
              required
            />
            <InputIconMail />
          </InputContainer>
          <InputContainer>
            <Input
              name="password"
              type="password"
              placeholder="Type a password"
              value={values.password}
              onInput={handleOnInput}
              required
            />
            <InputIconLock />
          </InputContainer>
          <Button type="submit">Sign Up</Button>
        </Form>
        {messageText.length > 0 && <Message>{messageText}</Message>}
      </Container>
    </>
  )
}

export default SignUp
