import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ref',
      type: 'text',
    },
    {
      name: 'position',
      type: 'text',
    },
    {
      name: 'sector',
      type: 'select',
      options: [
        {
          label: 'Software (AI and development)',
          value: 'software',
        },
        {
          label: 'Hardware (Deep Tech)',
          value: 'hardware',
        },
        {
          label: 'Construction & Real Estate',
          value: 'construction',
        },
        {
          label: 'Logistics',
          value: 'logistics',
        },
        {
          label: 'Sales',
          value: 'sales',
        },
      ],
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'company_url',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'salary',
      type: 'text',
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
        },
      ],
    },
    {
      name: 'linkedIn',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'position',
  },
}
