import { Metadata } from "next"

const Settingslayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={{
        maxWidth: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </main>
  )
}

export default Settingslayout
