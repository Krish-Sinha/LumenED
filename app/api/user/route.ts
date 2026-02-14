import { usersTable } from "@/config/schema";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const user = await currentUser();

    // If Clerk can't find the user, stop here
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
        return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (users.length === 0) {
        const newUser = await db.insert(usersTable).values({
            email: email,
            name: user.fullName || "New User",
        }).returning();

        return NextResponse.json(newUser[0]);
    }

    return NextResponse.json(users[0]);
}