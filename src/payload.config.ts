import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Talent } from './collections/Talent'
import { AcquisitionLeads } from './collections/AcquisitionLeads'

import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Careers } from './collections/Careers'
import { Users } from './collections/Users'
import { plugins } from './plugins'
import getURL from './utilities/getURL'

import { es } from '@payloadcms/translations/languages/es'
import { en } from '@payloadcms/translations/languages/en'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const allowedOrigins = [
  'https://www.boticpartners.com',
  'https://boticpartners.com',
  'https://botic-cms.vercel.app',

  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),

  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean)

export default buildConfig({
  serverURL:
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001'),

  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),

  collections: [Posts, Careers, Media, Users, NewsletterSubscribers, Talent, AcquisitionLeads],

  cors: allowedOrigins,
  csrf: allowedOrigins,

  email: nodemailerAdapter({
    defaultFromName: process.env.EMAIL_FROM_NAME || 'Botic Partners',
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@boticpartners.com',
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),

  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  secret: process.env.PAYLOAD_SECRET,
  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },

  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: 'es',
  },
})
