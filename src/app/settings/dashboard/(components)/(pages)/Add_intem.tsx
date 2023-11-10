"use client"
import React, { useEffect, useRef, useState } from "react"
import css from "../style.module.scss"
import { react_toast_style } from "@/func/ReactToastStyle"
import toast from "react-hot-toast"
import DeleteSvg from "@/components/svg/DeleteSvg"
import Image from "next/image"
import axios from "axios"

type image_slider_state = {
  num: number
  link?: string
}

const Add_intem = () => {
  const [image_slider, set_image_slider] = useState<image_slider_state[]>([]),
    scroll_ref = useRef<HTMLDivElement>(null),
    [catagory, set_catagory] = useState<string[]>([]),
    [loading, set_loading] = useState<boolean>(false)

  useEffect(() => {
    scroll_ref.current!.scrollTo({
      left: -scroll_ref.current!.scrollWidth,
      behavior: "smooth",
    })
  }, [image_slider])
  return (
    <div className={css.add_item}>
      <form>
        <input
          type='text'
          placeholder='Enter Product Name'
        />
        <input
          type='number'
          placeholder='Enter Price'
        />
        <div
          className={css.section_scroll}
          ref={scroll_ref}
        >
          <div>
            <button
              className={css.add_button}
              type='button'
              onClick={() => {
                if(image_slider.find((i)=>!i.link)){
                  toast.error('plese enter image in all box',react_toast_style)
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
                  type='text'
                  placeholder='Past Image Link'
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
                  alt='not found'
                  fill={true}
                  onError={(e) => {
                    console.log(e)
                  }}
                />
              )}
              <button
                type='button'
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
          name=''
          id=''
          placeholder='Add Discription'
        ></textarea>
        <section>
          <input
            className='catagory-input'
            type='text'
            placeholder='Add catagory'
          />
          <button
            type='button'
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
          type='submit'
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default Add_intem
