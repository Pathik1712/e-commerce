import { useEffect } from "react"
import Cartsvg from "../svg/Cartsvg"
import css from './empty.module.scss'

const Empty = () => {

  return (
    <div className={css.empty}>
      <h1>Such An Empty</h1><Cartsvg/>
    </div>
  )
}

export default Empty
