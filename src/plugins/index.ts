import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Post } from '@/payload-types'
import getURL from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post> = ({ doc }) => {
  const url = getURL()

  if (doc && 'slug' in doc && typeof doc.slug === 'string') {
    return `${url}/${doc.slug}`
  }
  return url
}

function applyEditorToRichTextFields(fields: any[]): any[] {
  return fields.map((field) => {
    if (field.type === 'richText' && !field.editor) {
      return {
        ...field,
        editor: lexicalEditor(),
      }
    }
    // Recursividad para fields anidados
    if (field.fields) {
      return {
        ...field,
        fields: applyEditorToRichTextFields(field.fields),
      }
    }
    if (field.blocks) {
      return {
        ...field,
        blocks: field.blocks.map((block: any) => ({
          ...block,
          fields: applyEditorToRichTextFields(block.fields),
        })),
      }
    }
    if (field.rows) {
      return {
        ...field,
        rows: field.rows.map((row: any) => ({
          ...row,
          fields: applyEditorToRichTextFields(row.fields),
        })),
      }
    }
    return field
  })
}

export const plugins: Plugin[] = [
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  payloadCloudPlugin(),
]
