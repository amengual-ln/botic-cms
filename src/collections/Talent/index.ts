import type { CollectionConfig } from 'payload'

export const Talent: CollectionConfig = {
  slug: 'talent',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'source', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        const to = process.env.TALENT_NOTIFY_EMAIL || 'admin@boticpartners.com'

        try {
          await req.payload.sendEmail({
            to,
            subject: `[Talent] New submission — ${doc.name}`,
            text: [
              `Name: ${doc.name}`,
              `Email: ${doc.email}`,
              `Source: ${doc.source ?? '-'}`,
              ``,
              `Message:`,
              doc.message,
            ].join('\n'),
          })
        } catch (err) {
          req.payload.logger.error(err, 'Talent email notification failed')
        }
      },
    ],
  },

  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'source', type: 'text' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
