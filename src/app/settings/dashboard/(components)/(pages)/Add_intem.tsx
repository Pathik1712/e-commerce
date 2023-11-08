"use client"
import css from "../style.module.scss"

const Add_intem = () => {
  return (
    <div className={css.add_item}>
      <form>
        <label htmlFor=''>Enter Item Name:</label>
        <input
          type='text'
          name=''
        />
        <div>
          <button type='button'>➕</button>
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
