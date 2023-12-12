"use client"
import React, { useEffect, useRef, useState } from "react"
import css from "../style.module.scss"
import { react_toast_style } from "@/func/ReactToastStyle"
import toast from "react-hot-toast"
import DeleteSvg from "@/components/svg/DeleteSvg"
import Image from "next/image"
import GlobalLoader from "@/components/Loader/GlobalLoader"
import axios from "axios"
import { useDispatch } from "react-redux"
import { update_item } from "@/lib/redux/user_slice"
import { Item } from "../../../../../../user"
import { AppDispatch, useStoreselector } from "@/lib/redux/store"

type Props = {
  id: string | null
}
type form_attr = {
  value: string
  focus(): React.FocusEvent
}

type form_data = {
  product_discount: form_attr
  product_name: form_attr
  product_price: form_attr
  product_dec: form_attr
  catagory_input: form_attr
} & HTMLFormElement

type image_slider_state = {
  num: number
  link?: string
}

const UpdateItems = ({ id }: Props) => {
  const item_data = useStoreselector((state) => state.users.data.items)?.find(
    (i) => i.id === id
  )
  const [image_slider, set_image_slider] = useState<image_slider_state[]>(
      item_data!.image.map((i, num) => ({ num: num, link: i }))
    ),
    scroll_ref = useRef<HTMLDivElement>(null),
    [catagory, set_catagory] = useState<string[]>(item_data!.catagory),
    [loading, set_loading] = useState<boolean>(false),
    form_ref = useRef<form_data>(null),
    dispatch = useDispatch<AppDispatch>()

  // ! scroll slider

  useEffect(() => {
    scroll_ref.current!.scrollTo({
      left: -scroll_ref.current!.scrollWidth,
      behavior: "smooth",
    })
  }, [image_slider])

  // ! submit handler

  const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    set_loading(true)
    try {
      const data = form_ref.current
      if (catagory.length === 0) {
        toast.error("You must add atleast one catagory", react_toast_style)
        data?.catagory_input.focus()
        return
      } else if (image_slider.length === 0) {
        toast.error(
          "you must add atleast one picture of product",
          react_toast_style
        )
        return
      } else if (image_slider.find((i) => !i.link)) {
        toast.error("please fill all image links", react_toast_style)
        return
      } else if (
        data?.product_discount.value &&
        parseFloat(data.product_price.value) <
          parseFloat(data.product_discount.value)
      ) {
        toast.error("discount is more than product price", react_toast_style)
        return
      } else {
        const obj: Omit<
          Item,
          "ratings" | "Sold" | "Odered" | "reviewes" | "whishlist_id"
        > = {
          catagory,
          image: image_slider.map((i) => i.link!),
          name: data!.product_name.value,
          price: parseFloat(data!.product_price.value),
          description: data!.product_dec.value,
          mrp:
            data?.product_discount.value === ""
              ? null
              : parseFloat(data!.product_discount.value),
          id: id!,
        }
        try {
          const res = await axios.put(
            process.env.NEXT_PUBLIC_API! + "/user/comp/add",
            obj
          )
          toast.success(res.data.msg, react_toast_style)
          dispatch(update_item(obj))
        } catch {
          toast.error(
            "something went wrong please try again",
            react_toast_style
          )
        }
      }
    } catch (e) {
    } finally {
      set_loading(false)
    }
  }
  return (
    <div className={css.add_item}>
      <form
        onSubmit={handle_submit}
        ref={form_ref}
      >
        <input
          name="product_name"
          required={true}
          type="text"
          defaultValue={item_data?.name}
          placeholder="Enter Product Name"
        />
        <input
          name="product_price"
          required={true}
          type="number"
          defaultValue={item_data?.price}
          placeholder="Enter Price"
        />
        <input
          type="text"
          inputMode="numeric"
          name="product_discount"
          placeholder="Enter Discount"
          defaultValue={item_data?.mrp}
        />
        <div
          className={css.section_scroll}
          ref={scroll_ref}
        >
          <div>
            <button
              className={css.add_button}
              type="button"
              onClick={() => {
                if (image_slider.find((i) => !i.link)) {
                  toast.error("plese enter image in all box", react_toast_style)
                  scroll_ref.current!.scrollTo({
                    left: -scroll_ref.current!.scrollWidth,
                    behavior: "smooth",
                  })
                  return
                }
                if (image_slider.length > 5) {
                  toast.error("You Can Only Select 6 Image", react_toast_style)
                  return
                }
                if (image_slider.length === 0) {
                  set_image_slider([{ num: 1 }])
                } else {
                  const obj: image_slider_state = {
                    num: image_slider[image_slider.length - 1].num + 1,
                  }
                  set_image_slider([...image_slider, obj])
                }
              }}
            >
              ➕
            </button>
          </div>
          {image_slider.map((i, num) => (
            <div key={`add-item-image-${num}`}>
              {!i.link ? (
                <input
                  type="text"
                  placeholder="Past Image Link"
                  onChange={async (e) => {
                    if (
                      !e.target.value.includes("https:") &&
                      !e.target.value.includes("image")
                    ) {
                      e.target.value = ""
                    } else {
                      try {
                        const link = e.target.value
                        const promise = axios.head(link)
                        toast.promise(
                          promise,
                          {
                            loading: "Loadin Image",
                            error: "Enter Valid Url",
                            success: "",
                          },
                          {
                            ...react_toast_style,
                            success: {
                              duration: 1,
                            },
                          }
                        )
                        const res = await promise
                        const str: string = res.headers["content-type"]
                        if (str.includes("image/")) {
                          set_image_slider(
                            image_slider.map((item) =>
                              item.num === i.num
                                ? { ...item, link: link }
                                : item
                            )
                          )
                        } else {
                          toast.error(
                            "This Url Does Not Contain Image",
                            react_toast_style
                          )
                        }
                      } catch {}
                    }
                  }}
                />
              ) : (
                <Image
                  src={i.link!}
                  alt="not found"
                  fill={true}
                  onError={(e) => {
                    console.log(e)
                  }}
                />
              )}
              <button
                type="button"
                className={css.remove_button}
                onClick={() => {
                  set_image_slider(
                    image_slider.filter((item) => item.num !== i.num)
                  )
                }}
              >
                <DeleteSvg />
              </button>
            </div>
          ))}
        </div>
        <textarea
          required={true}
          name="product_dec"
          defaultValue={item_data?.description}
          placeholder="Add Discription"
        ></textarea>
        <section>
          <input
            name="catagory_input"
            className="catagory-input"
            type="text"
            placeholder="Add catagory"
          />
          <button
            type="button"
            onClick={() => {
              const elm = document.getElementsByClassName(
                "catagory-input"
              )[0] as HTMLInputElement
              const search = catagory.find((i) => i === elm.value)
              if (search !== undefined || elm.value === "") {
                const message =
                  elm.value === ""
                    ? "catagory is empty"
                    : "catagory alredy included in list"
                toast.error(message, react_toast_style)
                return
              }
              set_catagory([...catagory, elm.value])
              elm.value = ""
              elm.focus()
            }}
          >
            Add
          </button>
          <div>
            {catagory.map((i, num) => (
              <span key={`catagory-${num}`}>
                <span>{i}</span>
                <button
                  type="button"
                  onClick={() => {
                    set_catagory(catagory.filter((item) => item !== i))
                  }}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </section>
        <button
          className={css.submit_button}
          type="submit"
          disabled={loading}
        >
          {loading ? <GlobalLoader /> : "Update"}
        </button>
      </form>
    </div>
  )
}

export default UpdateItems
