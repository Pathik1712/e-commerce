import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

type body = {
  email: string
  phone: string
  password: string
  username: string
}
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
    include: {
      company_detail: true,
    },
  })
  console.log(res)
  return NextResponse.json(res)
}
