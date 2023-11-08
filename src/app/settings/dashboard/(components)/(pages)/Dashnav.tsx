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
      <div>
        <Link href={"dashboard"}>add item</Link>
        <Link href={"dashboard?path=orders"}>order&#39;s</Link>
        <Link href={"dashboard?path=charts"}>charts</Link>
        <Link href={"dashboard?path=items"}>items</Link>
      </div>
    </nav>
  )
}

export default Dashnav
