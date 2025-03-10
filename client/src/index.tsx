import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import React from "react"
import ReactDOM from "react-dom/client"

import Login from "./pages/Login"
import Main from "./Main"
import reportWebVitals from "./reportWebVitals"
import SignUp from "./pages/SignUp"
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper"

import { DarkModeContextProvider } from "./contexts/DarkModeContext"

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

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "page-title": "PokéAPI MERN project",
        hello: "Hello",
        "pokemon-not-found": "Pokémon {{searchValue}} not found",
        loading: "Loading",
        english: "English",
        spanish: "Spanish",
      },
    },
    es: {
      translation: {
        "page-title": "Proyecto PokéAPI MERN",
        hello: "Hola",
        "pokemon-not-found": "Pokémon {{searchValue}} no encontrado",
        loading: "Cargando",
        english: "Inglés",
        spanish: "Español",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <QueryClientProvider client={queryClient}>
    <DarkModeContextProvider>
      <ThemeProviderWrapper>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ThemeProviderWrapper>
    </DarkModeContextProvider>
  </QueryClientProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
