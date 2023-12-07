"use client"
import Image from "next/image"
import css from "./style.module.scss"
import Ratings from "../svg/Ratings"
import React, { useEffect, useMemo, useState } from "react"
import Heart from "../svg/Heart"
import { AppDispatch, useStoreselector } from "@/lib/redux/store"
import { http } from "@/func/Api"
import { add_whishlist } from "@/lib/redux/user_slice"
import { useDispatch } from "react-redux"
import { Item } from "../../../user"
import { formatePrice } from "@/func/PriceFormate"

type Props = {
  img: string
  title: string
  rating: number
  price: number
  mrp: number
  id: string
  item: Item
  Component?: React.ComponentType<any>
}

const Card = ({
  img,
  rating,
  title,
  price,
  mrp,
  id,
  item,
  Component,
}: Props) => {
  const data = useStoreselector((state) => state.users.data)

  const [whishList, set_whishList] = useState(false),
    dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (data?.whishlist == null) {
      set_whishList(false)
      return
    } else {
      const res = data.whishlist.find((i) => i.id === id)
      if (res == undefined) {
        set_whishList(false)
        return
      }
      set_whishList(true)
    }
  }, [data?.whishlist, id])

  return (
    <div className={css.card}>
      <button
        disabled={data == null}
        className={whishList ? css.fillIcon : ""}
        onClick={async () => {
          dispatch(add_whishlist({ id, type: !whishList, item }))
          await http.patch(
            "user/create/",
            { id, user_id: data.id },
            { params: { data_to_update: "whishlist", type: !whishList } }
          )
        }}
      >
        <Heart />
      </button>
      <Image
        src={img}
        alt="not found"
        height={500}
        width={500}
      />
      <h3>{title}</h3>
      <div>
        <p className={mrp == null || mrp === 0 ? "" : css.discount}>
          <span className={css.price}>
            {" "}
            &#8377; {formatePrice(price.toString())}
          </span>
          <span className={css.mrp}>
            &#8377; {mrp && formatePrice(mrp.toString())}
          </span>
        </p>
        <span>
          {rating}
          <Ratings />
        </span>
      </div>
      <section>
        {item.catagory
          .slice(0, 2)
          .map((i) => i)
          .reduce((prev, cur) => prev + " , " + cur)}
      </section>
      {Component && <Component />}
    </div>
  )
}
export default Card
