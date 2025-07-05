import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const counter = await prisma.clickCounter.findUnique({
    where: { id: 1 },
  })

  return NextResponse.json({ count: counter?.count || 0 })
}

export async function POST() {
  const counter = await prisma.clickCounter.upsert({
    where: { id: 1 },
    update: { count: { increment: 1 } },
    create: { id: 1, count: 1 },
  })

  return NextResponse.json({ count: counter.count })
}
