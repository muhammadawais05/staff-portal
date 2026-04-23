import { objectToQueryString } from '@staff-portal/navigation'
import { PLATFORM_API_URL } from '@staff-portal/config'

const SHORTEN_URL = PLATFORM_API_URL + '/shorten_url'

export const twitterUrl = (
  pageUrl: string,
  pageTitle: string,
  hashtags?: string
) => {
  let url = 'http://twitter.com/share?'

  url += `text=${encodeURIComponent(pageTitle)}`
  url += `&url=${encodeURIComponent(pageUrl)}`
  if (hashtags) {
    url += `&hashtags=${encodeURIComponent(hashtags)}`
  }
  url += `&counturl=${encodeURIComponent(pageUrl)}`

  return url
}

export const facebookUrl = (pageUrl: string, pageTitle: string, text = '') => {
  let url = 'http://www.facebook.com/sharer.php?'

  url += `&u=${encodeURIComponent(pageUrl)}`
  url += `&title=${encodeURIComponent(pageTitle)}`
  url += `&description=${encodeURIComponent(text)}`

  return url
}

export const linkedinUrl = (pageUrl: string, pageTitle: string, text = '') => {
  let url = 'https://www.linkedin.com/shareArticle?mini=true'

  url += `&url=${encodeURIComponent(pageUrl)}`
  url += `&title=${encodeURIComponent(pageTitle)}`
  url += `&summary=${encodeURIComponent(text)}`

  return url
}

export const getShareUrl = async (
  type: 'facebook' | 'twitter' | 'linkedin',
  referralUrl: string
) => {
  const title = 'Check out Toptal if you need to hire great talent quickly'

  const shortenUrl = await getSlugUrl(referralUrl)

  let url = ''

  switch (type) {
    case 'facebook':
      url = facebookUrl(shortenUrl, title)
      break
    case 'twitter':
      url = twitterUrl(shortenUrl, title)
      break
    case 'linkedin':
      url = linkedinUrl(shortenUrl, title)
      break
    default:
      break
  }

  return url
}

export const getSlugUrl = async (url: string) => {
  const search = objectToQueryString({ url })

  const response = await fetch(SHORTEN_URL, {
    method: 'POST',
    body: search,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    credentials: 'include'
  })
  const jsonResponse = await response.json()

  return jsonResponse.shorten
}
