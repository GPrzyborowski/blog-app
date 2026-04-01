require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
const bcrypt = require('bcrypt')

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10)

  await prisma.user.upsert({
    where: { login: 'admin' },
    update: {},
    create: {
      login: 'admin',
      password: hashedPassword,
    },
  })
  console.log('Admin user created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })