const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
    const prisma = new PrismaClient();
    try {
        const hash = await bcrypt.hash("admin", 10);
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
        console.log("Admin seeded successfully");
    } catch (e) {
        console.error("Error seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
