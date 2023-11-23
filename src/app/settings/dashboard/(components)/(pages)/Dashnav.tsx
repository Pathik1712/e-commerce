import Link from "next/link"
import css from "../style.module.scss"
import Image from "next/image"

type props = {
  img: string
  name: string
  location: "items" | "charts" | "orders" | null | "update"
}

const Dashnav = ({ img, name, location }: props) => {
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
        <Link
          href={"dashboard"}
          className={!location ? css.active : ""}
        >
          add item
        </Link>
        <Link
          href={"dashboard?path=orders"}
          className={location === "orders" ? css.active : ""}
        >
          Order&#39;s
        </Link>
        <Link
          href={"dashboard?path=charts"}
          className={location === "charts" ? css.active : ""}
        >
          Charts
        </Link>
        <Link
          href={"dashboard?path=items"}
          className={location === "items" ? css.active : ""}
        >
          Items
        </Link>
        <Link href={"/"}>Home</Link>
      </div>
      <div className={css.nav_mobile}>
        <input
          type='checkbox'
          id='dash-board-nav-toggle'
        />
        <label htmlFor='dash-board-nav-toggle'>Pages</label>
        <section>
          <Link
            href={"dashboard"}
            className={!location ? css.active_mobile : ""}
          >
            add item
          </Link>
          <Link
            href={"dashboard?path=orders"}
            className={location === "orders" ? css.active_mobile : ""}
          >
            order&#39;s
          </Link>
          <Link
            href={"dashboard?path=charts"}
            className={location === "charts" ? css.active_mobile : ""}
          >
            charts
          </Link>
          <Link
            href={"dashboard?path=items"}
            className={location === "items" ? css.active_mobile : ""}
          >
            items
          </Link>
          <Link href={"/"}>home</Link>
        </section>
      </div>
    </nav>
  )
}

export default Dashnav
