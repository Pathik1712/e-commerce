import Image from "next/image"
import Cart from "@/components/svg/Cartsvg"
import css from "../style.module.scss"
import { useStoreselector } from "@/lib/redux/store"
import Empty from "@/components/empty template/Empty"
import Link from "next/link"
import PieChart from "@/components/svg/PieChart"

const Items = () => {
  const data = useStoreselector((state) => state.users.data.items)
  return (
    <div className={css.items}>
      {data!.length > 0 &&
        data!.map((i, num) => (
          <main key={`items-${num}`}>
            <h1>{i.name}</h1>
            <section>
              {i.image.map((image, image_num) => (
                <Image
                  src={image}
                  alt="not found"
                  key={`items-${num}-image-${image_num}`}
                  height={500}
                  width={500}
                />
              ))}
            </section>
            <p>price:{i.mrp != null ? i.mrp : i.price}</p>
            <p className={css.whishlist}>
              <Cart /> whishlist count:{" "}
              {i.whishlist_id != null ? i.whishlist_id.length : 0}
            </p>
            <div>
              {i.catagory.map((catagory, catagory_num) => (
                <span key={`items-${num}-catagory-${catagory_num}`}>
                  {catagory}
                </span>
              ))}
            </div>
            <span>
              <Link href={`dashboard?path=update&id=${i.id}`}>Update</Link>
              <button>remove</button>
              <Link
                href={`dashboard?path=charts&id=${i.id}`}
                className={css.chart_link}
              >
                <PieChart />
              </Link>
            </span>
            <hr />
          </main>
        ))}
      {data!.length === 0 && <Empty />}
      <div style={{ paddingBottom: "10rem" }}></div>
    </div>
  )
}

export default Items
