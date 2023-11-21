import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Item } from "../../../../../../user"

export const POST = async (req: Request) => {
  const data: Item = await req.json()
  try {
    const res=await prisma.user.update({
      data: {
        items: {
          create: {
            name: data.name,
            price: parseFloat(data.price),
            image: data.image,
            catagory: data.catagory,
            description:data.description 
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
