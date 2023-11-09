import Link from "next/link"
import css from "../style.module.scss"
import Image from "next/image"

type props = {
  img: string
  name: string
}

const Dashnav = ({ img, name }: props) => {
  return (
    <nav className={css.nav}>
      <Image
        src={img}
        alt='not found'
        height={500}
        width={500}
      />
      <p>{name}</p>
      <div className={css.nav_pc}>
        <Link href={"dashboard"}>add item</Link>
        <Link href={"dashboard?path=orders"}>Order&#39;s</Link>
        <Link href={"dashboard?path=charts"}>Charts</Link>
        <Link href={"dashboard?path=items"}>Items</Link>
        <Link href={"/"}>Home</Link>
      </div>
      <div className={css.nav_mobile}>
        <input
          type='checkbox'
          id='dash-board-nav-toggle'
        />
        <label htmlFor='dash-board-nav-toggle'>Pages</label>
        <section>
          <Link href={"dashboard"}>add item</Link>
          <Link href={"dashboard?path=orders"}>order&#39;s</Link>
          <Link href={"dashboard?path=charts"}>charts</Link>
          <Link href={"dashboard?path=items"}>items</Link>
          <Link href={"/"}>home</Link>
        </section>
      </div>
    </nav>
  )
}

export default Dashnav
