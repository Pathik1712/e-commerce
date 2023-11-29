import GlobalLoader from "@/components/Loader/GlobalLoader"
import css from './style.module.scss'

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