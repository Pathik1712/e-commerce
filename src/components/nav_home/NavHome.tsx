import Logo from "../svg/Logo"
import Menubtn from "./components/Menubtn"
import Link from "next/link"
import Cartsvg from "../svg/Cartsvg"
import css from "./style.module.scss"
import Search from "./components/Search"

const NavHome = () => {
  return (
    <nav className={css.nav}>
      <Logo />
      <Search />
      <section className={css.mobile_nav_section}>
        <Cartsvg />
        <Menubtn />
      </section>
    </nav>
  )
}

export default NavHome
