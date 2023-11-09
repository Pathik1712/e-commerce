"use client"
import { useEffect, useRef, useState } from "react"
import css from "../style.module.scss"
import { react_toast_style } from "@/func/ReactToastStyle"
import toast from "react-hot-toast"

const Add_intem = () => {
  const [image_slider, set_image_slider] = useState(0),
    scroll_ref = useRef<HTMLDivElement>(null)


    useEffect(()=>{
      scroll_ref.current!.scrollTo({
        left: -scroll_ref.current!.scrollWidth,
        behavior: "smooth",
      })
    },[image_slider])
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
              type='button'
              onClick={() => {
                if (image_slider > 5) {
                  toast.error("You Can Only Select 6 Image", react_toast_style)
                  return
                }
                set_image_slider((prev) => prev + 1)
              }}
            >
              ➕
            </button>
          </div>
          {[...Array(image_slider)].map((i, num) => (
            <div key={num}>
              <button
                type='button'
                onClick={() => {
                  console.log(scroll_ref.current?.scrollWidth,'  ',scroll_ref.current!.clientWidth)
                  set_image_slider(0)
                }}
              >
                click
              </button>
            </div>
          ))}
        </div>
        <textarea
          name=''
          id=''
          placeholder='Add Discription'
        ></textarea>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add_intem
