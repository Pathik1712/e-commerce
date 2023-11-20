import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Item } from "../../../../../../user"

export const POST = async (req: Request) => {
  const data: Item = await req.json()
  try {
    await prisma.user.update({
      data: {
        items: {
          create: {
            name: data.name,
            price: data.price,
            image: data.image,
            catagory: data.catagory,
          },
        },
      },
      where: {
        id: data.id,
      },
    })
    return NextResponse.json(
      { msg: "product added successfully" },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ msg: "something went wrong" }, { status: 500 })
  }
}
