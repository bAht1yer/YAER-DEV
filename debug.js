const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("Starting debug script...");
    try {
        const hash = await bcrypt.hash("admin", 10);
        const user = await prisma.user.upsert({
            where: { email: "admin@yaer.com" },
            update: {},
            create: {
                email: "admin@yaer.com",
                username: "admin",
                password: hash,
                role: "ADMIN"
            }
        });
        console.log("Success! Created user:", user.email);
    } catch (e) {
        console.error("Prisma Error:", e);
    }
}

main();
