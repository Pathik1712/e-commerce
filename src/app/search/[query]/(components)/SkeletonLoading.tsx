import React from "react"
import css from "../style.module.scss"

const SkeletonLoading = () => {
  return (
    <div className={css.loading}>
      {[...Array(10)].map((i, num) => (
        <section key={`loading-${num}`}>
          <div></div>
          <p></p>
          <span></span>
        </section>
      ))}
    </div>
  )
}

export default SkeletonLoading
