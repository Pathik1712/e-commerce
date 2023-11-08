import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Company } from "../../../../../../user"

export const POST = async (req: Request) => {
  const { address, company_logo, company_name, contact }: Company =
    await req.json()
  const email = new URL(req.url).searchParams.get("email")!
  const alredy_exist = await prisma.company.findFirst({
    where: { company_name: company_name },
  })
  if (alredy_exist) {
    return NextResponse.json({ alredy_exist: true })
  }
  await prisma.user.update({
    data: {
      type: "seller",
      company_detail: {
        create: {
          company_logo,
          company_name,
          contact,
          address: {
            create: {
              city: address.city,
              state: address.state,
              country: JSON.stringify(address.country),
              mobile: contact,
              name: company_name,
            },
          },
        },
      },
    },
    where: {
      email,
    },
  })
  return NextResponse.json({ alredy_exist: false }, { status: 200 })
}
