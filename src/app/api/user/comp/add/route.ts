import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Item } from "../../../../../../user"

export const POST = async (req: Request) => {
  const data: Item = await req.json()
  try {
    const res = await prisma.user.update({
      data: {
        items: {
          create: {
            name: data.name,
            price: parseFloat(data.price),
            image: data.image,
            catagory: data.catagory,
            description: data.description,
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

export const PUT = async (req: Request) => {
  const data: Item = await req.json()
  
  console.log(await prisma.item.findFirst({ where: { id: data.id } }),data.id)
  try {
    await prisma.item.update({
      where: { id: data.id },
      data: {
        price: data.price,
        mrp: data.mrp,
        image: data.image,
        description: data.description,
        catagory: data.catagory,
      },
    })
    return NextResponse.json(
      { msg: "product updated successfully" },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ msg: "something went wrong" }, { status: 500 })
  }
}

export const DELETE = async (req: Request) => {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")!
  await prisma.item.delete({
    where: {
      id,
    },
  })
}
