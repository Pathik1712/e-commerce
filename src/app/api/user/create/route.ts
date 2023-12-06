import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import { Address } from "../../../../../user"
import { create } from "domain"

type body = {
  email: string
  phone: string
  password: string
  username: string
}

type patch_update_type = "whishlist" | "order"

export const POST = async (req: Request) => {
  const body: body = await req.json()
  const hash_pass = await bcrypt.hash(body.password, 10)
  const alredy_exist = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })
  if (alredy_exist) {
    return new NextResponse(null, { status: 200 })
  }
  await prisma.user.create({
    data: {
      email: body.email,
      password: hash_pass,
      phone: body.phone,
      name: body.username,
    },
  })
  return new NextResponse("submited", { status: 200 })
}

export const GET = async (req: Request) => {
  const email = new URL(req.url).searchParams.get("email")
  const res = await prisma.user.findFirst({
    where: {
      email: email!,
    },
    select: {
      adress: true,
      image: true,
      cart: true,
      sold_items: true,
      whishlist: true,
      name: true,
      type:true,
      id: true,
      email: true,
      items: true,
      phone: true,
      password: false,
      company_detail: {
        include: {
          address: true,
        },
      },
    },
  })
  return NextResponse.json(res)
}

export const PUT = async (req: Request) => {
  const data: Address & { user_id: string } = await req.json()
  try {
    if (!data.id) {
      await prisma.user.update({
        data: {
          adress: {
            create: {
              city: data.city,
              country: data.country,
              mobile: data.mobile,
              name: data.name,
              state: data.state,
              adress: data.adress,
              pincode: data.pincode,
            },
          },
          phone: data.mobile,
        },
        where: {
          id: data.user_id,
        },
      })
    } else {
      await prisma.user.update({
        data: {
          adress: {
            update: {
              where: {
                id: data.id,
              },
              data: {
                city: data.city,
                country: data.country,
                mobile: data.mobile,
                name: data.name,
                state: data.state,
                adress: data.adress,
                pincode: data.pincode,
              },
            },
          },
          phone: data.mobile,
        },
        where: { id: data.user_id },
      })
    }
    return new NextResponse()
  } catch (e) {
    console.log(e)
    return new NextResponse("something went wrong", { status: 400 })
  }
}

export const PATCH = async (req: Request) => {
  const res = await req.json()
  const type = new URL(req.url).searchParams.get(
    "data_to_update"
  ) as patch_update_type
  if (type === "whishlist") {
    const add_remove = new URL(req.url).searchParams.get("type") as
      | "true"
      | "false"

      console.log( new URL(req.url).searchParams.get("type"))

    if (add_remove === "true") {
      await prisma.user.update({
        where: { id: res.user_id },
        data: {
          whishlist: {
            connect: {
              id: res.id,
            },
          },
        },
      })
    } else {
      await prisma.user.update({
        where: {
          id: res.user_id,
        },
        data: {
          whishlist: {
            disconnect: {
              id: res.id,
            },
          },
        },
      })
    }
  }
  return new NextResponse("successfull")
}
