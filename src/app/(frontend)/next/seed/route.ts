import { seed } from '@payloadcms/db-seed'
import payload from 'payload'
import { getPayloadClient } from '../../../getPayload'
import { createLocalReq } from '@payloadcms/next/utilities'

// This route can be requested locally to seed the database
// You can fetch this route from within a script, or call it manually via HTTP
// For example, you can run `curl http://localhost:3000/api/seed` while your app is running
export async function GET() {
  const payloadClient = await getPayloadClient()

  const user = await payloadClient.findByID({
    collection: 'users',
    id: '1', // O el ID que corresponda a un usuario real
  })

  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  // Corrige el problema de typescript con sessions (null vs undefined)
  const safeUser = {
    ...user,
    sessions: user.sessions ?? undefined,
  }

  const payloadReq = await createLocalReq({ user: safeUser }, payload)

  await seed({ payload, req: payloadReq })

  return new Response('Seeding complete.', {
    status: 200,
  })
}
