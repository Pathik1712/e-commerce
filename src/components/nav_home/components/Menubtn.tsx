import css from "../style.module.scss"
import Link from "next/link"
import Usersvg from "@/components/svg/Usersvg"
import Getheight from "@/func/Getheight"
import Heart from "@/components/svg/Heart"
import Settings from "@/components/svg/Settings"
import Signout from "@/components/svg/Signout"
import Order from "@/components/svg/Order"
import Seller from "@/components/svg/Seller"
import SignoutButton from "@/func/Signout"
import { getServerSession } from "next-auth"
import { option } from "@/app/api/auth/[...nextauth]/route"
import Image from "next/image"

const Menubtn = async () => {
  const session = await getServerSession(option)

  return (
    <>
      <Getheight />
      <input
        type='checkbox'
        id='menu_btn'
      />
      <label
        htmlFor='menu_btn'
        className={css.menu_btn}
      >
        <span></span>
        <span></span>
      </label>
      <label
        id='menu'
        className={css.menu}
        htmlFor='menu_btn'
      ></label>
      <div
        className={css.sidebar}
        id='sidebar'
      >
        <section>
          <label htmlFor='menu_btn'>×</label>
          {session ? (
            <div className={css.user_profile}>
              {session.user?.image === null ? (
                <Usersvg />
              ) : (
                <Image
                  src={session.user?.image!}
                  alt='not found'
                  height={32}
                  width={32}
                />
              )}
              <span>{session.user?.name}</span>
            </div>
          ) : (
            <Link href={"/auth/login"}>
              <Usersvg /> Login
            </Link>
          )}
        </section>
        <ul>
          <li>
            <Link href={"/settings/orders"}>
              {" "}
              <Order /> order&#39;s{" "}
            </Link>
          </li>
          <li>
            <Link href={"/settings/whishlist"}>
              {" "}
              <Heart /> whishlist{" "}
            </Link>
          </li>
          <li>
            <Link href={"/settings/dashboard"}>
              <Seller /> become seller
            </Link>
          </li>
          <li>
            <Link href={"/settings/accounts"}>
              {" "}
              <Settings /> manage account{" "}
            </Link>
          </li>
          <li>
            <SignoutButton>
              {" "}
              <Signout /> sign out{" "}
            </SignoutButton>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Menubtn
