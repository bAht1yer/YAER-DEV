import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    const hash = await bcrypt.hash("admin", 10);
    try {
        await prisma.user.upsert({
            where: { email: "admin@yaer.com" },
            update: {},
            create: {
                email: "admin@yaer.com",
                username: "admin",
                password: hash,
                role: "ADMIN",
            },
        });
        return NextResponse.json({ message: "Admin user seeded successfully." });
    } catch (e: any) {
        return NextResponse.json({ error: e.message });
    }
}
