"use client"
import { useState } from "react"
import css from "../style.module.scss"

const Add_intem = () => {
  const [image_slider,set_image_slider]=useState(0)
  return (
    <div className={css.add_item}>
      <form>
        <input
          type='text'
          placeholder="Enter Product Name"
        />
        <input type="number" placeholder="Enter Price"  />
        <div>
          <button type='button' onClick={()=>{set_image_slider(prev=>prev+1)}}>➕</button>
        </div>
        {[...Array(image_slider)].map((i,num)=>(<div key={num}>{image_slider}</div>))}
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
