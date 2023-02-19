import React from "react"
import ReactDOM from "react-dom/client"
import Main from "./Main"
import reportWebVitals from "./reportWebVitals"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeProvider } from "styled-components"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
])

const theme = {
  primary: "#FE6D7A",
  secondary: "#F1F0CC",
  "primary--darker": "#3F0D12",
  "secondary--darker": "#75624E",
  brown: "#D5BF86",
  secondaryFontFamily: "Roboto",
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  </QueryClientProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
