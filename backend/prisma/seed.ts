import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

async function main() {
  const prisma = new PrismaClient()

  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const plain = process.env.ADMIN_PASSWORD || 'Admin123!'
  const role: 'admin' = 'admin'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin user already exists, skipping creation:', email)
    return
  }

  const hashed = await bcrypt.hash(plain, 10)
  const user = await prisma.user.create({
    data: {
      name: 'Administrator',
      email,
      password: hashed,
      role,
    },
    select: { id: true, email: true, role: true },
  })

  console.log('Created admin user:', user)
  console.log('Credentials -> email:', email, 'password:', plain)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => process.exit())
