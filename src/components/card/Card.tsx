import Image from "next/image"
import css from "./style.module.scss"
import Ratings from "../svg/Ratings"

type Props = {
  img: string
  title: string
  rating: number
  price: number
  mrp: number
}

const Card = ({ img, rating, title, price, mrp }: Props) => {
  return (
    <div className={css.card}>
      <Image
        src={img}
        alt="not found"
        height={500}
        width={500}
        objectFit="cover"
      />
      <h3>{title}</h3>
      <div>
        <p className={mrp == null ? "" : css.discount}>
          {" "}
          &#8377; {price} <span>&#8377; {mrp}</span>
        </p>
        <span>
          {rating}
          <Ratings />
        </span>
      </div>
    </div>
  )
}
export default Card
