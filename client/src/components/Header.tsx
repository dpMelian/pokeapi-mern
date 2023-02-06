import React from "react"

const Header = () => {
  return (
    <nav className="bg-poke-red border-gray-200 py-5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <h1>
          PokéAPI MERN project
        </h1>
        <div>
          <ul>
            <li>Sign Up</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
