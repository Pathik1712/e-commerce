import css from "./style.module.scss"
import SearchBar from "./(components)/SearchBar"

type props = {
  children: React.ReactNode
  params: { query: string }
}

const Searhlayout = ({ children, params: { query } }: props) => {
  return (
    <main className={css.searchPage}>
      <SearchBar path={query} />
      {children}
    </main>
  )
}

export default Searhlayout
