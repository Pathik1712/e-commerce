import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const search_data = new URL(req.url).searchParams.get("search")
  const sort = new URL(req.url).searchParams.get("sort")
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
    orderBy:
      sort === null
        ? []
        : sort === "high"
        ? { price: "desc" }
        : sort === "low"
        ? { price: "asc" }
        : { ratings: "desc" },
    take: 10,
  })
  return NextResponse.json(res)
}
