import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import { logActivity } from "@/lib/logActivity";

export async function PUT(req: Request) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestBody;
  try {
    requestBody = await req.json();
  } catch (error) {
    console.error("Error parsing JSON body for profile update:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, bio } = requestBody;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Name is required and cannot be empty" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name.trim(), // Use trimmed name
        bio: bio?.trim(), // Use trimmed description
      },
    });

    // Log the activity of updating profile
    await logActivity({
      userId: user.id,
      action: "UPDATE_PROFILE",
      metadata: JSON.parse(
        JSON.stringify({
          updated: updatedUser,
        })
      ),
    });

    return NextResponse.json(updatedUser, { status: 201 }); // Return 201 Created
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: `Failed to update profile: ${error}` },
      { status: 500 }
    );
  }
}
