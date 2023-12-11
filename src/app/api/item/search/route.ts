import prisma from "@/lib/prisma"
import { redirect } from "next/dist/server/api-utils"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const search_data = new URL(req.url).searchParams.get("search")
  const res = await prisma.item.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search_data!,
          },
        },
        {
          catagory: {
            has: search_data!,
          },
        },
      ],
    },
    take: 10,
  })
  return NextResponse.json(res)
}
