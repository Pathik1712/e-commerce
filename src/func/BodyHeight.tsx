"use client"

import { useEffect } from "react"

const BodyHeight = () => {
  useEffect(() => {
    const func = () => {
      let body = document.getElementsByTagName("body")[0] as HTMLBodyElement
      body.style.height = `${window.innerHeight}px`
    }
    window.addEventListener("resize", func)
    func()
    return () => {
      window.removeEventListener("resize", func)
    }
  }, [])
  return <></>
}

export default BodyHeight
