import css from "../style.module.scss"
import GlobalLoader from "@/components/Loader/GlobalLoader"

const loading = () => {
  return (
    <div className={css.loading}>
      <div>
        <GlobalLoader />
        please wait...
      </div>
    </div>
  )
}

export default loading
