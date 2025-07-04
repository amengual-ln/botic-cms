const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const rootRedirect = {
    source: '/',
    destination: '/admin',
    permanent: true, // o false si preferís que sea temporal
  }

  return [internetExplorerRedirect, rootRedirect]
}

export default redirects
