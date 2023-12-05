import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const data = await prisma.item.findMany()
  return NextResponse.json(data)
}
