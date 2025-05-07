"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";

export async function GET() {
  // Pass headers as an object property
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userWithInventories = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      inventories: {
        include: { items: false },
      },
    },
  });

  return NextResponse.json(userWithInventories?.inventories ?? []);
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name } = body;

  const newInventory = await prisma.inventory.create({
    data: { name, userId: user.id },
  });

  return NextResponse.json(newInventory);
}
