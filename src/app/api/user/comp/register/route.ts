import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Company } from "../../../../../../user"
import {ICountry} from'country-state-city'

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
  const select_from_country=address.country as unknown as ICountry
  const obj={name:select_from_country.name,isocode:select_from_country.isoCode,currency:select_from_country.currency}
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
              country: JSON.stringify(obj),
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
