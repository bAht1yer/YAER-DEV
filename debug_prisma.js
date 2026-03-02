const { execSync } = require('child_process');
const fs = require('fs');
try {
    const result = execSync('npx prisma generate', { encoding: 'utf8' });
    fs.writeFileSync('prisma_error.log', "STDOUT:\n" + result);
} catch (error) {
    fs.writeFileSync('prisma_error.log', "STDOUT:\n" + (error.stdout || "") + "\nSTDERR:\n" + (error.stderr || ""));
}
