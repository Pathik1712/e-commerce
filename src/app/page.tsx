import css from "./page.module.scss"
import NavHome from "@/components/nav_home/NavHome"

export default function Home() {
  return (
    <main className={css.main}>
      <NavHome />
    </main>
  )
}
