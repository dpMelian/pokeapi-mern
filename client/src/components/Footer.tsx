import React from "react"

const Footer = () => {
  return (
    <footer className="flex justify-center border-[0] border-t-2 border-solid border-black bg-secondary dark:border-primary dark:bg-slate-700 dark:text-primary">
      <h2 className="m-0">
        Designed and developed by{" "}
        <a
          className="dark:text-primary"
          href="https://github.com/dpMelian"
          target="_blank"
        >
          dpMelian
        </a>
      </h2>
    </footer>
  )
}

export default Footer
