import PageTemplate, { generateMetadata } from './[slug]/page'

import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/admin')
}

// export default PageTemplate

// export { generateMetadata }
