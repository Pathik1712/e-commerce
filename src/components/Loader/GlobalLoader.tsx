import css from "./style.module.scss"

const GlobalLoader = () => {
  return (
    <span className={css.load}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  )
}

export default GlobalLoader
