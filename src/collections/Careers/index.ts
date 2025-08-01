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
      label: 'Enlace a la web de la empresa (De este se infiere el logo)',
      type: 'text',
    },
    {
      name: 'Ocultar empresa',
      type: 'checkbox',
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
      name: 'Ocultar salario',
      type: 'checkbox',
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
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
        },
      ],
    },
    {
      name: 'linkedIn',
      label: 'LinkedIn (Enlace a la búsqueda o publicación en LinkedIn)',
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
