import { type } from "os"

type User_state = {
  id: string
  email: string
  password?: string
  phone?: string
  name?: string
  image?: string
  emailVerified?: Date
  type: "buyer" | "seller"
  availbel_items: Item[]
  whishlist: Item[]
  cart: Item[]
  sold_items: Sold[]
  adress: Address[]
  company_detail: Company
}

type Address = {
  id?: string
  name: string
  mobile: string
  adress?: string
  pincode?: string
  country: string
  city: string
  state: string
}
type Company = {
  id?: string
  company_name: string
  company_logo: string
  contact: string
  address: {} & Address
}

type Order = {
  id: string
  details?: Json
  placed_at: Date
  price: number
  status: string
}

type Item = {
  id?: string
  name: string
  price: Float
  mrp?: Float
  catagory: string[]
  image: string[]
  ratings: Float
  Sold: Sold[]
  description: String
  reviewes: [
    {
      ratings: Number
      desc: string
    }
  ]
  Odered: Order[]
}

type Sold = {
  id: string
  price: Float
  sold_date: Date
  quantity: number
  city: string
}

type Country = {
  name: string
  isoCode: string
  phonecode: string
  currency: string
  latitude: string
  longitude: string
}
