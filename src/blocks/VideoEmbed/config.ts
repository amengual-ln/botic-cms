import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Custom (player URL)', value: 'custom' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL del video',
    },
    { name: 'title', type: 'text', label: 'Título accesible' },
    { name: 'start', type: 'number', label: 'Segundos de inicio (opcional)' },
    { name: 'allowFullScreen', type: 'checkbox', defaultValue: true },
    {
      name: 'aspect',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
      ],
    },
  ],
}
