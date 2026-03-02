const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash('admin', 10);
    try {
        await prisma.user.create({
            data: {
                email: 'admin@yaer.com',
                username: 'admin',
                password: hash,
                role: 'ADMIN',
            },
        });
        console.log('Admin user seeded successfully with username/password "admin"');
    } catch (e) {
        console.log('Admin might already exist:', e.message);
    }
}
main();
