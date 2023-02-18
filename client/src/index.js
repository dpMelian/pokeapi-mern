import React from "react"
import ReactDOM from "react-dom/client"
import Main from "./Main"
import reportWebVitals from "./reportWebVitals"
import SignUp from "./pages/SignUp"
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
])

const theme = {
  primary: "#FFFAD7",
  secondary: "#E97777",
  "primary--darker": "#FCDDB0",
  "secondary--lighter": "#FF9F9F",
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
