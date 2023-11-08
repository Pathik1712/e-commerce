"use client"

import { useEffect } from "react"

const Getheight = ({ elm }: { elm?: string }) => {
  useEffect(() => {
    const func = () => {
      if (elm === undefined) {
        const menu = document.getElementById("menu") as HTMLElement
        const sidebar = document.getElementById("sidebar") as HTMLElement
        const height = window.innerHeight.toLocaleString()
        menu.style.height = height + "px"
        sidebar.style.height = height + "px"
      } else {
        let tag = document.getElementById(elm as string) as HTMLElement
        tag.style.height = `${window.innerHeight}px`
      }
    }
    func()
    document.addEventListener("resize", func)
    return () => document.removeEventListener("resize", func)
  }, [elm])
  return <></>
}

export default Getheight
