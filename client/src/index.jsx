import React from "react"
import ReactDOM from "react-dom/client"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import Login from "./pages/Login"
import Main from "./Main"
import reportWebVitals from "./reportWebVitals"
import SignUp from "./pages/SignUp"
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper"

import { DarkModeContextProvider } from "./contexts/DarkModeContext"
import MUI_THEME from "./constants/muiTheme"

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

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={MUI_THEME}>
      <DarkModeContextProvider>
        <ThemeProviderWrapper>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </ThemeProviderWrapper>
      </DarkModeContextProvider>
    </ThemeProvider>
  </QueryClientProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
