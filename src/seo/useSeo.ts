import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { canonicalFor, jsonLdFor, seoForPath } from './routes'
import { SITE_NAME, SITE_URL } from './site'

const JSON_LD_ATTR = 'data-seo-jsonld'

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attr}="${key}"]`
  let node = document.head.querySelector<HTMLMetaElement>(selector)

  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attr, key)
    document.head.append(node)
  }

  node.setAttribute('content', content)
}

const removeMeta = (attr: 'name' | 'property', key: string) => {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

const setCanonical = (href: string) => {
  let node = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!node) {
    node = document.createElement('link')
    node.rel = 'canonical'
    document.head.append(node)
  }

  node.href = href
}

const setJsonLd = (blocks: unknown[]) => {
  document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((node) => node.remove())

  for (const block of blocks) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(JSON_LD_ATTR, 'true')
    script.textContent = JSON.stringify(block)
    document.head.append(script)
  }
}

export const useSeo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = seoForPath(pathname)
    const canonical = seo.noindex ? `${SITE_URL}${pathname}` : canonicalFor(seo.path)

    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setCanonical(canonical)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:image', seo.image)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.image)

    if (seo.noindex) setMeta('name', 'robots', 'noindex,follow')
    else removeMeta('name', 'robots')

    setJsonLd(jsonLdFor(seo))
  }, [pathname])
}

export default useSeo
